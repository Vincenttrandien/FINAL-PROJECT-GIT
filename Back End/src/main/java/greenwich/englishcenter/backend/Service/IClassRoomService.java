package greenwich.englishcenter.backend.Service;

import greenwich.englishcenter.backend.Entity.classRoom;
import greenwich.englishcenter.backend.Exception.ServiceException;
import greenwich.englishcenter.backend.Form.response.PagingResponse;

public interface IClassRoomService {

    PagingResponse<classRoom> findAllRoom(int pageNumber , int pageSize , String year);

    PagingResponse<classRoom> searchByKey(int pageNumber , int pageSize , String year , String searchKey);

    classRoom insert(classRoom ClassRoom) ;

    classRoom edit(classRoom ClassRoom) throws  ServiceException;

    classRoom findById(String id) throws ServiceException;

    boolean delete(classRoom classRoom);

    classRoom findByTeacher(String usernameTeacher) throws ServiceException;

    classRoom findByService(String usernameService) throws ServiceException;
}
