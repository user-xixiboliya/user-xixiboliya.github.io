---
title: daemon 与 服务
date: 2025-02-20
categories:
  - technology 
description: 《鸟哥linux私房菜部分阅读记录》
resources:
  - src: "**.{png,jpg}"
    title: "Image #:counter"
    params:
      byline: ""
---

> 本文内容有待完善。 

- daemon，字面上意思为“守护神、恶魔”，通常没有 GUI 界面，是 Unix/Linux 环境的典型产物。具体表现为后台运行、不与终端交互的单个进程，是一种技术实现方式。
- service，简单来说是系统为了实现某些功能必须要提供的一些服务，由系统服务管理器定义和管理的 entity，可以包含 daemon，具备依赖、失败处理等高级特性。

> 简言之：**“所有 service 都有 daemon，但不一定所有 daemon 都是 service”**。

当然， 读者并不需要将daemon与service区分得如此细致。一般来说，在一个服务被建立之后，linux使用时，通常会在服务的名称之后加上`d`，例如`atd`，这个`d`代表`daemon`的意思。

```bash
xixiboliya@laptop-tex4-of-boxing:~$ systemctl list-units --type=service --state=active --no-pager | grep 'd\.service'
  snapd.seeded.service                                   loaded active exited  Wait until snapd is fully seeded
  snapd.service                                          loaded active running Snap Daemon
  systemd-journald.service                               loaded active running Journal Service
  systemd-logind.service                                 loaded active running User Login Management
  systemd-resolved.service                               loaded active running Network Name Resolution
  systemd-udevd.service                                  loaded active running Rule-based Manager for Device Events and Files
```

## 通过systemctl 查看单一服务
一般来说服务的启动有两个阶段，一个是开机的时候设置要不要启动这个服务，以及你现在要不要启动这个服务。查看服务树：`systemctl status`，找到其中一个服务进行解析：
```bash
xixiboliya@laptop-tex4-of-boxing:/etc/init.d$ systemctl status system-getty.slice
● system-getty.slice - Slice /system/getty
     Loaded: loaded
     Active: active since Sat 2025-07-12 07:47:15 CST; 5h 47min ago
      Tasks: 1
     Memory: 244.0K
        CPU: 2ms
     CGroup: /system.slice/system-getty.slice
             └─getty@tty1.service
               └─284 /sbin/agetty -o "-p -- \\u" --noclear tty1 linux

Jul 12 07:47:15 laptop-tex4-of-boxing systemd[1]: Created slice Slice /system/getty.
```
`system-getty.slice`是 `agetty` 程序运行起来的一个 **登录终端服务实例**，负责接收用户在 `tty1` 终端上的登录请求。
- **Loaded**：slice 单元已加载；
- **Active**：处于激活状态，表示 slice 当前是有效的；
- **Tasks**：这个 slice 下正运行的任务数量是 1；
- **CGroup 路径**：层级结构为 `/system.slice/system-getty.slice/...`，最后一行是 `agetty` 进程。

你可以通过`systemctl stop xxx`来结束服务。
****

`systemctl list-units --type=service --all`会列出所有的服务。
```bash
xixiboliya@laptop-tex4-of-boxing:/etc/init.d$ systemctl list-units --type=service --all
  UNIT              LOAD      ACTIVE   SUB     DESCRIPTION >
  apparmor.service     loaded    inactive dead    Load AppArmor profiles
```
- `UNIT`：项目的名称，包括各unit的类别
- `LOAD`: 开机时是否会被加载，默认`systemctl`显示的是有加载的项目而已。
- `ACTIVE`:目前的状态，需与后续的SUB搭配，就是我们用systemctl status查看的时候，active的项目，具体如下：

| 状态                   | 含义                                                                        |
| -------------------- | ------------------------------------------------------------------------- |
| **static**           | 没有 `[Install]` 安装配置，无法被启用（enable），但可由依赖触发启动，如挂载点、socket 等。                |
| **masked**           | 被“掩蔽”之后，其 unit 文件被链接到 `/dev/null`，无法被启动或启用，即使是依赖它的服务也无法调用，除非先 `unmask` 解锁 |
| **active (running)** | 服务正在运行中。                                                                  |
| **enabled**          | 系统启动时会自动启动该服务。`systemctl enable` 命令创建软链接到目标 target 中。                     |
| **disabled**         | 不会自动启动；但可以手动启动或被其他服务触发启动。                                                 |
| **failed**           | 启动或执行过程中失败。                                                               |
| **active (exited)**  | 仅执行一次就正常结束的服务，目前不在运行。例如开机执行一次的quotaon功能。                                  |
| **active(waiting)**  | 正在运行中，不过还需要等待其他事件发生才能正常进行。                                                |

> 题外话：什么是suspend？什么是休眠Hibernate？
> Suspend：将系统状态（内存内容）保存到内存（RAM），其他硬件（如显示器、硬盘）断电。需要持续电力供给内存，才能保持当前运行的程序和文档。恢复速度快，几秒内可以回复到挂起前的状态。万一断电（如拔电源、耗尽电池）就会丢失未保存数据。
> Hibernate（休眠）：将系统状态写入磁盘（swap 分区或 swap 文件），然后完全断电。不需任何电量亦可保持当前状态，适合长时间不使用时。恢复速度慢于挂起，需要读写磁盘才能恢复内存状态，但快过从头冷启动。通常恢复更安全，不会因断电而丢失数据。

