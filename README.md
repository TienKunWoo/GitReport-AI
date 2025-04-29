# GitReport AI / 智写工作报告

一个基于 Git 提交记录，使用 AI 智能生成工作报告的 VS Code 插件。通过 DeepSeek AI 智能分析和总结您的代码提交记录，快速生成结构化的工作报告，适用于周报、月报、项目总结等多种场景。

## ✨ 特性

- 🤖 智能写作：AI 自动分析提交记录，生成专业报告
- 📅 灵活配置：支持多种时间范围，一键生成周报/月报
- 📝 结构清晰：自动整理归类，重点内容突出
- 🚀 高效便捷：无需手动整理，节省时间精力
- 💾 智能保存：自动记忆配置，操作更便捷

## 📦 安装

1. 在 VS Code 中打开扩展商店
2. 搜索 "GitReport AI" 或 "智写工作报告"
3. 点击安装

## ⚙️ 配置

使用前需要进行以下配置：

1. DeepSeek API Key 设置
   - 打开 VS Code 设置
   - 搜索 "GitReport AI"
   - 在 `gitreport-ai.deepseekApiKey` 中填入您的 DeepSeek API Key

2. （可选）默认日期范围设置
   - `gitreport-ai.reportStartDate`: 报告开始日期 (YYYY-MM-DD)
   - `gitreport-ai.reportEndDate`: 报告结束日期 (YYYY-MM-DD)

## 🚀 使用方法

1. 在 VS Code 中打开包含 Git 仓库的项目
2. 使用以下任一方式启动插件：
   - 按下 `Ctrl/Cmd + Shift + P`，输入 "生成工作报告"
   - 在 VS Code 状态栏点击 "生成工作报告"

3. 选择日期范围：
   - 使用预设选项：
     - 最近一周
     - 最近两周
     - 最近一月
     - 本周（周一至今）
     - 上周（上周一至周日）
     - 本月（1号至今）
     - 上月（上月完整月份）
   - 或者选择"自定义日期"手动输入

4. 等待插件分析提交记录并生成报告
   - 进度条会显示当前处理状态
   - 可以随时取消生成过程

5. 查看生成的报告
   - 报告将以 Markdown 格式打开
   - 包含时间范围和工作内容摘要
   - 使用清晰的编号格式（1.2.3.4）

## 📝 报告格式

生成的报告采用以下格式：

\`\`\`markdown
# YYYY-MM-DD 至 YYYY-MM-DD 工作报告

1. 主要工作内容一
2. 主要工作内容二
   2.1 子工作项
   2.2 子工作项
3. 主要工作内容三
\`\`\`

## 🔍 特殊功能

1. 智能日期处理
   - 自动记住上次使用的日期范围
   - 当选定范围内没有提交记录时，可选择扩展到更大范围

2. 进度显示
   - 实时显示处理进度
   - 可以随时取消操作

3. 错误处理
   - 自动验证日期格式和范围
   - 友好的错误提示
   - 防止选择未来日期

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 开源协议

本项目采用 [GNU Affero General Public License v3.0](https://www.gnu.org/licenses/agpl-3.0.html) 开源协议。

根据 AGPL-3.0 协议的要求：
1. 任何基于本项目的衍生作品必须以相同的许可证开源
2. 如果您修改了代码，则必须开放源代码
3. 如果您通过网络提供服务，也必须开放源代码
4. 不允许将本项目用于闭源的商业软件

## 🔄 更新日志

### v0.0.1
- 初始版本发布
- 支持基本的报告生成功能
- 集成 DeepSeek AI
- 添加多种日期范围预设选项

## 💡 常见问题

1. Q: 为什么没有生成任何内容？
   A: 请确保所选日期范围内有 Git 提交记录。

2. Q: 如何获取 DeepSeek API Key？
   A: 请访问 DeepSeek 官网注册账号并创建 API Key。

3. Q: 生成的内容不够详细怎么办？
   A: 尝试扩大日期范围，或者确保提交信息足够详细。

4. Q: 支持哪些语言的提交信息？
   A: 支持所有语言的提交信息，DeepSeek AI 会智能处理。

## 🔗 相关链接

- [源代码仓库](https://github.com/yourusername/gitreport-ai)
- [问题反馈](https://github.com/yourusername/gitreport-ai/issues)
- [DeepSeek API 文档](https://platform.deepseek.com/docs)

## Git 提交规范

本项目使用 [Angular 提交规范](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular)，提交格式如下：

```
<type>(<scope>): <subject>
```

### 提交类型（type）说明：

- feat: 新功能
- fix: 修复 Bug
- docs: 文档变更
- style: 代码格式（不影响代码运行的变动）
- refactor: 重构（既不是新增功能，也不是修改 bug 的代码变动）
- perf: 性能优化
- test: 增加测试
- chore: 构建过程或辅助工具的变动
- revert: 回退
- build: 打包

### 示例：

```bash
git commit -m "feat(report): 添加周报生成功能"
git commit -m "fix(date): 修复日期选择问题"
git commit -m "docs(readme): 更新安装说明"
```

### 提交规范强制检查

本项目使用 commitlint 进行提交规范检查，确保所有提交信息符合规范。如果提交信息不符合规范，提交将被拒绝。

安装依赖：
```bash
npm install --save-dev @commitlint/cli @commitlint/config-conventional
```

配置 Git hooks：
```bash
npm install --save-dev husky
npx husky install
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'
``` 