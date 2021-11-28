package greenwich.englishcenter.backend.Service;

import greenwich.englishcenter.backend.Entity.User;
import greenwich.englishcenter.backend.Exception.ServiceException;
import greenwich.englishcenter.backend.Form.response.PagingResponse;


public interface IUserInformationService {

    PagingResponse<User> findAllUser(int pageNumber , int pageSize , String year);

    PagingResponse<User> searchByKey(int pageNumber ,int pageSize , String year, String searchKey);

    User findById (String id) throws ServiceException;

    User edit(User user) throws ServiceException;

    boolean delete(User user) ;

    User findByUsername(String username) throws ServiceException;

    User findByClass(String codeClass) throws  ServiceException;

}
