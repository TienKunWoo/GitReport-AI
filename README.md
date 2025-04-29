# GitReport AI

基于 Git 提交记录，使用 AI 智能生成工作报告的 VS Code 插件。

## 功能

- 根据 Git 提交记录生成工作报告
- 支持自定义日期范围
- 使用 DeepSeek API 生成智能摘要

## 安装

1. 在 VS Code 中搜索 "GitReport AI" 并安装。
2. 在设置中配置 DeepSeek API Key。

## 使用

1. 在 VS Code 中打开命令面板（`Ctrl+Shift+P` 或 `Cmd+Shift+P`）。
2. 输入 "生成工作报告" 并选择该命令。
3. 选择日期范围或使用默认日期。
4. 等待 AI 生成工作报告。

## 配置

在 VS Code 设置中配置以下选项：

- `gitreport-ai.reportStartDate`: 报告开始日期 (YYYY-MM-DD)
- `gitreport-ai.reportEndDate`: 报告结束日期 (YYYY-MM-DD)
- `gitreport-ai.deepseekApiKey`: DeepSeek API Key

## 问题反馈

如有问题或建议，请访问 [GitHub Issues](https://github.com/TienKunWoo/GitReport-AI/issues)。

## 许可证

AGPL-3.0 