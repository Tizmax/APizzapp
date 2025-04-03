import com.apizzapp.service.UserService;
import org.springframework.stereotype.Service;

package com.apizzapp.service.impl;


@Service
public class UserServiceImpl implements UserService {

    @Override
    public String getUser() {
        return "Hello User";
    }
}