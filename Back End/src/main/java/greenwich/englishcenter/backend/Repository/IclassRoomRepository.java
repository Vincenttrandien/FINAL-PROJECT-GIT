package greenwich.englishcenter.backend.Repository;

import greenwich.englishcenter.backend.Entity.classRoom;
import greenwich.englishcenter.backend.Form.response.PagingResponse;

public interface IclassRoomRepository {

    PagingResponse<classRoom> findAllRoom(int pageNumber , int pageSize , String year);

    PagingResponse<classRoom> searchKey(int pageNumber , int pageSize , String year , String searchKey);

    classRoom insert(classRoom ClassRoom);

    classRoom findById(String id);

    classRoom edit(classRoom ClassRoom);

    boolean delete(classRoom ClassRoom);

    classRoom existedClass(String codeClass , String date);

    classRoom findByTeacher(String usernameTeacher);

    classRoom findByService(String usernameService);
}
