dave
====

### 预装环境

1. java

2. mysql － 创建本地mysql，然后执行命令:

```
use test
source src/main/resources/sqls/FINANCE.sql
```

### 运行

运行命令```mvn clean spring-boot:run```就会启动嵌入式的tomcat服务，打开浏览器，输入http://localhost:8880就可以访问dave了。

### TODO

未完待续。

### 支持数据源

1. mysql

2. sql sever

3. kettle
