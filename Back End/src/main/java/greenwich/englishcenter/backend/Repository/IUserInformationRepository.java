package greenwich.englishcenter.backend.Repository;

import greenwich.englishcenter.backend.Entity.User;
import greenwich.englishcenter.backend.Form.response.PagingResponse;

public interface IUserInformationRepository {

    PagingResponse<User> findAllUser(int pageNumber ,int pageSize , String year);

    PagingResponse<User> searchByKey(int pageNumber ,int pageSize , String year, String searchKey);

    User findById (String id);

    User edit(User user);

    boolean delete(User user);

    User findByEmailOrUserName(String email , String username);

    User findByUserName(String username);

    User findByClass(String codeClass);

}
