package greenwich.englishcenter.backend.Service.impl;

import greenwich.englishcenter.backend.Entity.User;
import greenwich.englishcenter.backend.Exception.NotFoundException;
import greenwich.englishcenter.backend.Exception.ServiceException;
import greenwich.englishcenter.backend.Form.response.PagingResponse;
import greenwich.englishcenter.backend.Repository.IUserInformationRepository;
import greenwich.englishcenter.backend.Service.IUserInformationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class UserInformationServiceImpl implements IUserInformationService {

    @Autowired
    IUserInformationRepository userInformationRepository;

    @Override
    public PagingResponse<User> findAllUser(int pageNumber, int pageSize, String year) {
        return userInformationRepository.findAllUser(pageNumber,pageSize,year);
    }

    @Override
    public PagingResponse<User> searchByKey(int pageNumber, int pageSize, String year, String searchKey) {
        if(searchKey == null || searchKey.isEmpty()){
            return userInformationRepository.findAllUser(pageNumber, pageSize, year);
        }
        return userInformationRepository.searchByKey(pageNumber,pageSize,year,searchKey);
    }

    @Override
    public User findById(String id) throws ServiceException {
        User user = userInformationRepository.findById(id);
        if (user == null){
            throw new ServiceException(NotFoundException.USER_NOT_FOUND.getDesc(), HttpStatus.BAD_REQUEST);
        }
        return user;
    }

    @Override
    public User edit(User user) throws ServiceException {

        User existedUser = userInformationRepository.findByEmailOrUserName(
                user.getEmail(), user.getUsername());

        if(existedUser == null){
            throw new ServiceException(NotFoundException.USER_NOT_FOUND.getDesc(),HttpStatus.BAD_REQUEST);
        }

        return userInformationRepository.edit(user);
    }

    @Override
    public boolean delete(User user)  {
        return userInformationRepository.delete(user);
    }

    @Override
    public User findByUsername(String username) throws ServiceException {
        User user = userInformationRepository.findByUserName(username);
        if(user == null){
            throw new ServiceException(NotFoundException.USER_NOT_FOUND.getDesc(), HttpStatus.BAD_REQUEST);
        }
        return user;
    }

    @Override
    public User findByClass(String codeClass) throws ServiceException {
        User user = userInformationRepository.findByClass(codeClass);
        if(user == null){
            throw new ServiceException(NotFoundException.USER_NOT_FOUND.getDesc(), HttpStatus.BAD_REQUEST);
        }
        return  user;
    }
}
