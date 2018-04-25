package com.todorex.service;

import com.todorex.SpringBootTestAbstract;
import com.todorex.dao.UserRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.Assert.*;

/**
 * Created by rex on 2018/4/25.
 */
@RunWith(SpringRunner.class)
@SpringBootTest
public class UserDetailsServiceImplTest extends SpringBootTestAbstract {
    @Autowired
    private UserRepository userRepository;

    @Test
    public void loadUserByUsername() throws Exception {
        System.out.println(userRepository.findByUsername("admin"));
    }

}