# sequelize ORM操作数据库

详情：[sequelize官网](https://www.sequelize.com.cn/)

> 

```cmd
# 创建数据库
sequelize db:create --charset 'utf8mb4'

# 创建模型和迁移文件
sequelize model:generate --name Article --attributes title:string,content:text
创建了一张叫Article的表，字段有title,content

# 运行迁移命令：在数据库中生成对应的表和字段
sequelize db:migrate

# 建表之后 创建种子文件即测试数据配置文件
sequelize seed:generate --name article

# 配置测试数据传入表中
sequelize db:seed:all
只想运行指定的种子文件，可以执行 sequelize db:seed --seed xxx-article

# 恢复到最近迁移
npx sequelize-cli db:migrate:undo

# 恢复到特定的迁移.
sequelize-cli db:migrate:undo:all --to 20211129070632-change-user.js

# 关联表

```