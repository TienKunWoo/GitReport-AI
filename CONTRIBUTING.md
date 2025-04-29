# 贡献指南

感谢您对 GitReport AI 项目的关注！我们欢迎各种形式的贡献，包括但不限于功能建议、bug 报告、代码贡献等。

## 开发环境设置

1. 克隆仓库
```bash
git clone https://github.com/yourusername/gitreport-ai.git
cd gitreport-ai
```

2. 安装依赖
```bash
npm install
```

3. 打开 VS Code
```bash
code .
```

4. 启动开发
- 按 F5 启动调试
- 在新窗口中测试插件

## 项目结构

```
gitreport-ai/
├── src/                    # 源代码目录
│   ├── extension.ts        # 插件主入口
│   └── test/              # 测试文件
├── .vscode/               # VS Code 配置
├── node_modules/          # 依赖包
├── out/                   # 编译输出目录
├── package.json           # 项目配置
├── tsconfig.json          # TypeScript 配置
└── README.md             # 项目说明
```

## 开发指南

### 代码风格

- 使用 TypeScript 开发
- 遵循 ESLint 规则
- 使用 2 空格缩进
- 使用有意义的变量和函数名
- 添加必要的注释

### 提交规范

提交信息格式：
```
<type>(<scope>): <subject>

<body>

<footer>
```

类型（type）：
- feat: 新功能
- fix: 修复
- docs: 文档
- style: 格式
- refactor: 重构
- test: 测试
- chore: 构建过程或辅助工具的变动

示例：
```
feat(date): 添加日期范围选择功能

- 支持预设日期范围
- 添加自定义日期输入
- 优化日期验证逻辑

Closes #123
```

### 测试

1. 单元测试
```bash
npm run test
```

2. 集成测试
- 确保在不同的 Git 仓库中测试
- 验证不同的日期范围选择
- 测试错误处理情况

### 发布流程

1. 更新版本号
```bash
npm version patch/minor/major
```

2. 更新 CHANGELOG.md

3. 提交变更
```bash
git add .
git commit -m "release: vX.Y.Z"
git tag vX.Y.Z
git push && git push --tags
```

4. 发布到 VS Code 市场
```bash
vsce publish
```

## 功能开发建议

1. 新功能开发
- 创建功能分支
- 编写测试用例
- 实现功能代码
- 提交 Pull Request

2. Bug 修复
- 确认 bug 可复现
- 创建修复分支
- 添加测试用例
- 修复并验证
- 提交 Pull Request

3. 文档改进
- 确保文档清晰完整
- 添加必要的示例
- 更新 README.md

## 调试技巧

1. 使用 VS Code 调试
- 设置断点
- 使用 Debug Console
- 查看变量值

2. 日志输出
```typescript
console.log('调试信息');
console.error('错误信息');
```

3. 错误处理
```typescript
try {
    // 代码
} catch (error) {
    vscode.window.showErrorMessage(`错误: ${error}`);
}
```

## 常见问题

1. 编译错误
- 检查 TypeScript 版本
- 验证依赖项版本
- 清理并重新安装依赖

2. 调试问题
- 确认 launch.json 配置正确
- 检查是否有权限问题
- 验证 VS Code 版本兼容性

## 联系方式

- 提交 Issue
- 发送邮件
- 加入讨论组

## 行为准则

1. 尊重他人
2. 接受建设性意见
3. 保持专业态度
4. 遵循开源协议

感谢您的贡献！ 