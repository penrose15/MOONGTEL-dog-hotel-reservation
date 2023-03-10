package com.team012.server.users.service;

import com.team012.server.company.entity.Company;
import com.team012.server.company.service.CompanyService;
import com.team012.server.users.dto.CompanySignUpRequestDto;
import com.team012.server.users.entity.Users;
import com.team012.server.users.repository.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.team012.server.common.utils.constant.Constant.ROLE_COMPANY;

@Transactional
@RequiredArgsConstructor
@Service
public class UsersManageCompanyService {

    private final UsersRepository usersRepository;
    private final CompanyService companyService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    // Company(추가) 회원가입..
    public Users createCompany(CompanySignUpRequestDto dto) {

        // 비밀번호 암호화
        String encPassword = bCryptPasswordEncoder.encode(dto.getPassword());

        // 객체에 반영
        Users savedCompanyUser
                = Users.builder()
                .email(dto.getEmail())
                .password(encPassword)
                .username(dto.getUsername())
                .phone(dto.getPhone())
                .roles(ROLE_COMPANY.getMessage())
                .build();

        Users users = usersRepository.save(savedCompanyUser);

        companyService.createCompany(dto, users.getId());

        return savedCompanyUser;
    }

    // userId 로 업체정보 불러오기
    public Company getCompany(Long userId) {
        return companyService.getCompany(userId);
    }
}
