import * as vscode from 'vscode';
import { simpleGit, SimpleGit } from 'simple-git';
import axios from 'axios';

interface DeepSeekResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

function isValidDateRange(startDate: string, endDate: string): boolean {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const now = new Date();

  // 检查日期格式
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    throw new Error('日期格式无效，请使用 YYYY-MM-DD 格式');
  }

  // 检查日期范围
  if (start > end) {
    throw new Error(`开始日期 (${startDate}) 不能晚于结束日期 (${endDate})`);
  }

  // 检查是否是未来日期
  if (start > now) {
    throw new Error(`开始日期 (${startDate}) 不能是未来时间`);
  }
  if (end > now) {
    throw new Error(`结束日期 (${endDate}) 不能是未来时间`);
  }

  return true;
}

// 获取默认的日期范围（最近一周）
function getDefaultDateRange(): { startDate: string; endDate: string } {
  const end = new Date();
  const start = new Date();
  start.setDate(end.getDate() - 7);

  return {
    startDate: start.toISOString().split('T')[0],
    endDate: end.toISOString().split('T')[0],
  };
}

// 格式化日期为 YYYY-MM-DD
function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

async function getDeepSeekSummary(commits: string, progress: vscode.Progress<{ message?: string; increment?: number }>): Promise<string> {
  const config = vscode.workspace.getConfiguration('gitreport-ai');
  const apiKey = config.get<string>('deepseekApiKey');

  if (!apiKey) {
    // 弹窗提示用户，并引导去设置
    const action = await vscode.window.showErrorMessage('未检测到 DeepSeek API Key，无法生成周报。请先在设置中填写 API Key。', '去设置');
    if (action === '去设置') {
      // 跳转到插件设置页面，方便用户直接填写
      await vscode.commands.executeCommand('workbench.action.openSettings', '@ext:gitreport-ai.gitreport-ai');
    }
    // 终止后续流程，防止后面报错
    throw new Error('未配置 DeepSeek API Key');
  }

  progress.report({ message: '正在使用 AI 生成周报摘要...', increment: 50 });

  try {
    const response = await axios.post<DeepSeekResponse>(
      'https://api.deepseek.com/v1/chat/completions',
      {
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content:
              '你是一个专业的周报总结助手，请根据提供的 Git 提交记录，生成一份结构清晰、重点突出的周报总结。请使用1.2.3.4的格式列出工作内容，不要包含原始提交记录。',
          },
          {
            role: 'user',
            content: `请根据以下 Git 提交记录生成一份周报总结：\n\n${commits}`,
          },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    progress.report({ message: 'AI 摘要生成完成', increment: 20 });
    return response.data.choices[0].message.content;
  } catch (error) {
    // 优化错误提示，提供更友好的错误信息
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      const action = await vscode.window.showErrorMessage('DeepSeek API Key 无效，请检查并更新 API Key。', '去设置');
      if (action === '去设置') {
        await vscode.commands.executeCommand('workbench.action.openSettings', '@ext:gitreport-ai.gitreport-ai ');
      }
    }
    throw new Error(`调用 DeepSeek API 失败: ${error}`);
  }
}

// 日期范围预设选项
interface DateRangePreset {
  label: string;
  getDates: () => { startDate: string; endDate: string };
}

const dateRangePresets: DateRangePreset[] = [
  {
    label: '最近一周',
    getDates: () => {
      const end = new Date();
      const start = new Date();
      start.setDate(end.getDate() - 7);
      return {
        startDate: formatDate(start),
        endDate: formatDate(end),
      };
    },
  },
  {
    label: '最近两周',
    getDates: () => {
      const end = new Date();
      const start = new Date();
      start.setDate(end.getDate() - 14);
      return {
        startDate: formatDate(start),
        endDate: formatDate(end),
      };
    },
  },
  {
    label: '最近一月',
    getDates: () => {
      const end = new Date();
      const start = new Date();
      start.setMonth(end.getMonth() - 1);
      return {
        startDate: formatDate(start),
        endDate: formatDate(end),
      };
    },
  },
  {
    label: '本周',
    getDates: () => {
      const end = new Date();
      const start = new Date();
      const day = start.getDay() || 7; // 如果是周日(0)，将其视为7
      start.setDate(start.getDate() - day + 1); // 设置为本周一
      return {
        startDate: formatDate(start),
        endDate: formatDate(end),
      };
    },
  },
  {
    label: '上周',
    getDates: () => {
      const end = new Date();
      const start = new Date();
      const day = start.getDay() || 7;
      // 设置为上周一
      start.setDate(start.getDate() - day - 6);
      // 设置为上周日
      end.setDate(end.getDate() - day);
      return {
        startDate: formatDate(start),
        endDate: formatDate(end),
      };
    },
  },
  {
    label: '本月',
    getDates: () => {
      const end = new Date();
      const start = new Date(end.getFullYear(), end.getMonth(), 1);
      return {
        startDate: formatDate(start),
        endDate: formatDate(end),
      };
    },
  },
  {
    label: '上月',
    getDates: () => {
      const end = new Date();
      end.setDate(0); // 设置为上月最后一天
      const start = new Date(end.getFullYear(), end.getMonth(), 1);
      return {
        startDate: formatDate(start),
        endDate: formatDate(end),
      };
    },
  },
];

// 处理日期选择
async function handleDateSelection(defaultDates: {
  startDate: string;
  endDate: string;
}): Promise<{ startDate: string; endDate: string } | undefined> {
  // 构建快速选择项
  const quickPicks = [
    { label: '使用默认日期', description: `${defaultDates.startDate} 至 ${defaultDates.endDate}` },
    ...dateRangePresets.map(preset => ({
      label: preset.label,
      description: (() => {
        const { startDate, endDate } = preset.getDates();
        return `${startDate} 至 ${endDate}`;
      })(),
    })),
    { label: '自定义日期', description: '手动输入日期范围' },
  ];

  const selection = await vscode.window.showQuickPick(quickPicks, {
    placeHolder: '请选择日期范围',
    ignoreFocusOut: true,
  });

  if (!selection) {
    return undefined;
  }

  if (selection.label === '使用默认日期') {
    return defaultDates;
  }

  if (selection.label === '自定义日期') {
    const newStartDate = await vscode.window.showInputBox({
      prompt: '请输入开始日期 (YYYY-MM-DD)',
      value: defaultDates.startDate,
      ignoreFocusOut: true,
      validateInput: text => {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(text)) {
          return '请使用正确的日期格式：YYYY-MM-DD';
        }
        return null;
      },
    });

    if (!newStartDate) {
      return undefined;
    }

    const newEndDate = await vscode.window.showInputBox({
      prompt: '请输入结束日期 (YYYY-MM-DD)',
      value: defaultDates.endDate,
      ignoreFocusOut: true,
      validateInput: text => {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(text)) {
          return '请使用正确的日期格式：YYYY-MM-DD';
        }
        if (newStartDate && text < newStartDate) {
          return '结束日期不能早于开始日期';
        }
        return null;
      },
    });

    if (!newEndDate) {
      return undefined;
    }

    return { startDate: newStartDate, endDate: newEndDate };
  }

  // 使用预设日期范围
  const preset = dateRangePresets.find(p => p.label === selection.label);
  return preset ? preset.getDates() : undefined;
}

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('gitreport-ai.generateReport', async () => {
    try {
      // 使用 withProgress API 显示进度
      await vscode.window.withProgress(
        {
          location: vscode.ProgressLocation.Notification,
          title: '正在生成周报',
          cancellable: true,
        },
        async (progress, token) => {
          // 初始化进度
          progress.report({ message: '初始化中...', increment: 0 });

          // 检查是否取消
          if (token.isCancellationRequested) {
            return;
          }

          const config = vscode.workspace.getConfiguration('gitreport-ai');
          let startDate = config.get<string>('reportStartDate');
          let endDate = config.get<string>('reportEndDate');
          let useDefaultDates = false;

          // 如果没有配置日期，使用默认日期范围
          if (!startDate || !endDate) {
            const defaultDates = getDefaultDateRange();
            const result = await handleDateSelection(defaultDates);

            if (!result) {
              // 用户取消了操作
              return;
            }

            startDate = result.startDate;
            endDate = result.endDate;
            useDefaultDates = true;

            // 更新配置
            await config.update('reportStartDate', startDate, vscode.ConfigurationTarget.Global);
            await config.update('reportEndDate', endDate, vscode.ConfigurationTarget.Global);
          }

          progress.report({ message: '配置日期范围...', increment: 5 });

          // 验证日期范围
          isValidDateRange(startDate, endDate);

          progress.report({ message: '正在获取 Git 提交记录...', increment: 10 });

          if (token.isCancellationRequested) {
            return;
          }

          const git: SimpleGit = simpleGit(vscode.workspace.workspaceFolders?.[0].uri.fsPath);

          // 使用更精确的日期格式
          const log = await git.log({
            '--since': `${startDate} 00:00:00`,
            '--until': `${endDate} 23:59:59`,
            '--stat': null,
            '--date': 'iso',
          });

          if (log.total === 0) {
            if (useDefaultDates) {
              // 如果是默认日期范围且没有提交记录，尝试扩大范围到最近一个月
              const extendedStart = new Date();
              extendedStart.setDate(extendedStart.getDate() - 30);
              const newStartDate = formatDate(extendedStart);
              const newEndDate = formatDate(new Date());

              const shouldExtend = await vscode.window.showInformationMessage(
                `所选日期范围内没有提交记录，是否扩大范围到最近一个月？`,
                '是',
                '否'
              );

              if (shouldExtend !== '是') {
                return;
              }

              startDate = newStartDate;
              endDate = newEndDate;

              // 更新配置
              await config.update('reportStartDate', startDate, vscode.ConfigurationTarget.Global);
              await config.update('reportEndDate', endDate, vscode.ConfigurationTarget.Global);

              // 重新获取日志
              const extendedLog = await git.log({
                '--since': `${startDate} 00:00:00`,
                '--until': `${endDate} 23:59:59`,
                '--stat': null,
                '--date': 'iso',
              });

              if (extendedLog.total === 0) {
                vscode.window.showInformationMessage(`最近一个月内没有提交记录 (${startDate} 至 ${endDate})`);
                return;
              }

              vscode.window.showInformationMessage(`已扩大日期范围至最近一个月 (${startDate} 至 ${endDate})`);
              log.all = extendedLog.all;
              log.total = extendedLog.total;
            } else {
              vscode.window.showInformationMessage(`所选日期范围内没有提交记录 (${startDate} 至 ${endDate})`);
              return;
            }
          }

          progress.report({ message: '正在处理提交记录...', increment: 10 });

          if (token.isCancellationRequested) {
            return;
          }

          // 准备提交记录文本
          let commitsText = '';
          log.all.forEach((commit, index) => {
            commitsText += `日期: ${commit.date}\n`;
            commitsText += `提交信息: ${commit.message}\n`;
            if (commit.diff) {
              commitsText += `修改文件:\n`;
              commit.diff.files.forEach(file => {
                commitsText += `  - ${file.file}\n`;
              });
            }
            commitsText += '\n';

            // 更新处理进度
            if (index % Math.max(1, Math.floor(log.all.length / 5)) === 0) {
              progress.report({
                message: `正在处理提交记录 (${Math.min(100, Math.round(((index + 1) / log.all.length) * 100))}%)...`,
                increment: 1,
              });
            }
          });

          if (token.isCancellationRequested) {
            return;
          }

          // 获取 DeepSeek 的智能总结
          const summary = await getDeepSeekSummary(commitsText, progress);

          if (token.isCancellationRequested) {
            return;
          }

          progress.report({ message: '正在生成周报文档...', increment: 4 });

          // 生成周报内容
          let report = `# ${startDate} 至 ${endDate} 工作周报\n\n`;
          report += summary;

          // 创建并显示周报
          const document = await vscode.workspace.openTextDocument({
            content: report,
            language: 'markdown',
          });
          await vscode.window.showTextDocument(document);

          progress.report({ message: '完成！', increment: 1 });
          vscode.window.showInformationMessage('周报生成完成！');
        }
      );
    } catch (error) {
      console.error('生成周报失败:', error);
      vscode.window.showErrorMessage(`生成周报失败: ${error}`);
    }
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
