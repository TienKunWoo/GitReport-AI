# 贡献指南

感谢您对 GitReport AI 项目的关注！本文档将指导您如何参与项目开发。

## 开发环境设置

1. 克隆项目
```bash
git clone https://github.com/TienKunWoo/GitReport-AI.git
cd GitReport-AI
```

2. 安装依赖
```bash
npm install
```

3. 安装开发工具
```bash
npm install --save-dev @commitlint/cli @commitlint/config-conventional husky
```

4. 设置 Git 提交规范
```bash
npx husky install
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'
```

## 项目结构

```
GitReport-AI/
├── src/                # 源代码目录
│   ├── extension.ts    # 插件入口文件
│   └── utils/         # 工具函数
├── test/              # 测试文件
├── .vscode/           # VS Code 配置
├── .gitignore        # Git 忽略文件
└── package.json      # 项目配置文件
```

## Git 提交规范

我们使用 [Angular 提交规范](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular)，提交格式如下：

```
<type>(<scope>): <subject>
```

### 类型（type）

- feat: 新功能
- fix: 修复 Bug
- docs: 文档变更
- style: 代码格式调整
- refactor: 重构代码
- perf: 性能优化
- test: 添加测试
- chore: 构建或工具变动
- revert: 回退提交
- build: 打包相关

### 范围（scope）

- report: 报告生成相关
- date: 日期处理相关
- ui: 界面相关
- api: API 相关
- config: 配置相关
- git: Git 相关
- doc: 文档相关

### 示例

```bash
git commit -m "feat(report): 添加自定义报告模板功能"
git commit -m "fix(date): 修复日期范围验证问题"
git commit -m "docs(readme): 更新安装说明"
```

## 开发流程

1. 创建功能分支
```bash
git checkout -b feature/your-feature
```

2. 开发并提交更改
```bash
git add .
git commit -m "feat(scope): your changes"
```

3. 推送更改
```bash
git push origin feature/your-feature
```

4. 创建 Pull Request

## 代码规范

- 使用 TypeScript 编写代码
- 遵循 ESLint 规则
- 保持代码简洁清晰
- 添加必要的注释
- 编写单元测试

## 测试

运行测试：
```bash
npm test
```

## 文档维护

- 更新 README.md
- 添加代码注释
- 更新 CHANGELOG.md
- 维护 API 文档

## 发布流程

1. 更新版本号
```bash
npm version patch/minor/major
```

2. 更新 CHANGELOG.md

3. 构建插件
```bash
vsce package
```

4. 发布到 VS Code 市场
```bash
vsce publish
```

## 问题反馈

- 使用 GitHub Issues 报告问题
- 提供详细的复现步骤
- 附上相关的日志和截图

感谢您的贡献！ 