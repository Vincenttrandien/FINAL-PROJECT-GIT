package greenwich.englishcenter.backend.Service.impl;

import greenwich.englishcenter.backend.Entity.User;
import greenwich.englishcenter.backend.Entity.classRoom;
import greenwich.englishcenter.backend.Exception.NotFoundException;
import greenwich.englishcenter.backend.Exception.ServiceException;
import greenwich.englishcenter.backend.Form.response.PagingResponse;
import greenwich.englishcenter.backend.Repository.IclassRoomRepository;
import greenwich.englishcenter.backend.Service.IClassRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class ClassRoomServiceImpl implements IClassRoomService {

    @Autowired
    IclassRoomRepository classRoomRepository;

    @Override
    public PagingResponse<classRoom> findAllRoom(int pageNumber, int pageSize, String year) {
        return classRoomRepository.findAllRoom(pageNumber, pageSize , year);
    }

    @Override
    public PagingResponse<classRoom> searchByKey(int pageNumber, int pageSize, String year, String searchKey) {
        return classRoomRepository.searchKey(pageNumber, pageSize, year, searchKey);
    }

    @Override
    public classRoom insert(classRoom ClassRoom) {
        return classRoomRepository.insert(ClassRoom) ;
    }

    @Override
    public classRoom edit(classRoom ClassRoom) throws ServiceException {

        classRoom existClassRoom = classRoomRepository.existedClass(ClassRoom.getCodeClass() ,
                ClassRoom.getDate());

        if (existClassRoom == null){
            throw new ServiceException(NotFoundException.CLASSROOM_NOTFOUND.getDesc(), HttpStatus.BAD_REQUEST);

        }

        return classRoomRepository.edit(ClassRoom);
    }

    @Override
    public classRoom findById(String id) throws ServiceException {
        classRoom ClassRoom = classRoomRepository.findById(id);
        if(ClassRoom == null){
            throw new ServiceException(NotFoundException.CLASSROOM_EXISTED.getDesc(), HttpStatus.BAD_REQUEST);
        }
        return ClassRoom;
    }

    @Override
    public boolean delete(classRoom classRoom) {
        return classRoomRepository.delete(classRoom);
    }

    @Override
    public classRoom findByTeacher(String usernameTeacher) throws ServiceException {
        classRoom ClassRoom = classRoomRepository.findByTeacher(usernameTeacher);
        if(ClassRoom == null){
            throw new ServiceException(NotFoundException.CLASSROOM_NOTFOUND.getDesc(), HttpStatus.BAD_REQUEST);
        }
        return ClassRoom;
    }

    @Override
    public classRoom findByService(String usernameService) throws ServiceException {
        classRoom ClassRoom = classRoomRepository.findByService(usernameService);
        if(ClassRoom == null){
            throw new ServiceException(NotFoundException.CLASSROOM_NOTFOUND.getDesc(), HttpStatus.BAD_REQUEST);
        }
        return ClassRoom;
    }
}
