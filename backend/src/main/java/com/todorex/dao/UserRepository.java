package com.todorex.dao;

import com.todorex.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * 定义User操作接口(继承JpaRepository接口)
 * Created by rex on 2018/4/21.
 */
public interface UserRepository extends JpaRepository<User,Long>{
    // 利用内置的方法
    User findByUsername(String username);
}

