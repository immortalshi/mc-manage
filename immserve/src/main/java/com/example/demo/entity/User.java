package com.example.demo.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@TableName("user")
@Data
public class User {
    @TableId(type = IdType.ASSIGN_UUID)
    private int id;
    private String username;
    private String password;
    private String introduce;
    private int role;
    private String phone;
    private String mail;
}
