# GitReport AI

基于 Git 提交记录，使用 AI 智能生成工作报告的 VS Code 插件。

## 功能

- 根据 Git 提交记录生成工作报告
- 支持自定义日期范围
- 使用 DeepSeek API 生成智能摘要

## 安装

1. 在 VS Code 中搜索 "GitReport AI" 并安装。
2. 在设置中配置 DeepSeek API Key（如果未配置，插件会自动引导您前往设置页面）。

## 使用

1. 在 VS Code 中打开命令面板（`Ctrl+Shift+P` 或 `Cmd+Shift+P`）。
2. 输入 "生成工作报告" 并选择该命令。
3. 选择日期范围或使用默认日期。
4. 等待 AI 生成工作报告。

## 配置

在 VS Code 设置中配置以下选项：

- `gitreport-ai.reportStartDate`: 报告开始日期 (YYYY-MM-DD)
- `gitreport-ai.reportEndDate`: 报告结束日期 (YYYY-MM-DD)
- `gitreport-ai.deepseekApiKey`: DeepSeek API Key（必填项，如果未配置，插件会自动引导您前往设置页面）

## 常见问题

### 如何获取 DeepSeek API Key？
1. 访问 [DeepSeek 官网](https://platform.deepseek.com/) 注册账号
2. 在个人中心创建 API Key
3. 将 API Key 复制到 VS Code 设置中

### API Key 配置后仍然报错？
- 请检查 API Key 是否正确复制
- 确保 API Key 有足够的调用额度
- 如果提示 API Key 无效，请重新生成并更新

## 问题反馈

如有问题或建议，请访问 [GitHub Issues](https://github.com/TienKunWoo/GitReport-AI/issues)。

## 许可证

AGPL-3.0 