package com.todorex.service;

import com.todorex.dao.UserRepository;
import com.todorex.entity.Authority;
import com.todorex.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * SpringSecurity要求的类 要求实现UserDetailsService接口
 * Created by rex on 2018/4/22.
 */
@Service
public class UserDetailsServiceImpl implements UserDetailsService{

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(s);
        // Java8特性         .orElseThrow(() -> new UsernameNotFoundException(String.format("No user found with username '%s'.", s)));
        if (user == null) {
            throw new UsernameNotFoundException(String.format("No user found with username '%s'.", s));
        } else {
            return create(user);
        }

    }

    /**
     * 包装成SpringSecurity需要的User
     * @param user
     * @return
     */
    private static org.springframework.security.core.userdetails.User create(User user) {
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), mapToGrantedAuthorities(user.getAuthorities()));
    }

    /**
     * 包装权限
     * @param authorities
     * @return
     */
    private static List<GrantedAuthority> mapToGrantedAuthorities(List<Authority> authorities) {
        // Java8语法
        return authorities.stream()
                .map(authority -> new SimpleGrantedAuthority(authority.getName().name()))
                .collect(Collectors.toList());
    }

}
