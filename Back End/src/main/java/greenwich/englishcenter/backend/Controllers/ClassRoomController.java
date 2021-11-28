package greenwich.englishcenter.backend.Controllers;


import greenwich.englishcenter.backend.Entity.SupportForm;
import greenwich.englishcenter.backend.Entity.User;
import greenwich.englishcenter.backend.Entity.classRoom;
import greenwich.englishcenter.backend.Exception.ServiceException;
import greenwich.englishcenter.backend.Form.response.PagingResponse;
import greenwich.englishcenter.backend.Service.IClassRoomService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/greenwich/EnglishCenter/ClassRoom")
public class ClassRoomController {


    @Autowired
    IClassRoomService classRoomService;


    @GetMapping("/{id}")
    public ResponseEntity<classRoom> findById(@PathVariable("id") String id) throws ServiceException {
        return ResponseEntity.status(HttpStatus.OK).body(classRoomService.findById(id));
    }

    @GetMapping("/getAll")
    public ResponseEntity<PagingResponse<classRoom>> findAllRoom(@RequestParam int pageNumber,
                                                                   @RequestParam int pageSize,
                                                                   @RequestParam String year){
        return ResponseEntity.status(HttpStatus.OK)
                .body(classRoomService.findAllRoom(pageNumber, pageSize, year));
    }

    @GetMapping("/searchByKey")
    public ResponseEntity<PagingResponse<classRoom>> searchKey(@RequestParam int pageNumber,
                                                                 @RequestParam int pageSize,
                                                                 @RequestParam String year,
                                                                 @RequestParam String searchKey){
        return ResponseEntity.status(HttpStatus.OK)
                .body(classRoomService.searchByKey(pageNumber, pageSize, year, searchKey));
    }

    @GetMapping(value="/findByTeacher")
    public ResponseEntity<classRoom> findByTeacher(@RequestParam String usernameTeacher) throws ServiceException{
        return ResponseEntity.status(HttpStatus.OK).body(classRoomService.findByTeacher(usernameTeacher));
    }

    @GetMapping(value="/findByService")
    public ResponseEntity<classRoom> findByClass(@RequestParam String usernameService) throws ServiceException{
        return ResponseEntity.status(HttpStatus.OK).body(classRoomService.findByService(usernameService));
    }

    @PostMapping("/create")
    public ResponseEntity<classRoom> createClass(@RequestBody classRoom ClassRoom){
        return ResponseEntity.status(HttpStatus.OK)
                .body(classRoomService.insert(ClassRoom));
    }

    @PutMapping("/{id}")
    public ResponseEntity<classRoom> edit(
            @PathVariable("id") ObjectId id,
            @RequestBody classRoom ClassRoom) throws ServiceException{
        ClassRoom.setId(id);
        return ResponseEntity.status(HttpStatus.OK)
                .body(classRoomService.edit(ClassRoom));
    }

    @DeleteMapping(value ={"/{id}"})
    public ResponseEntity<Boolean> remove(@PathVariable("id") String id) throws ServiceException {
        return ResponseEntity.status(HttpStatus.OK).body(classRoomService.
                delete(classRoomService.findById(id)));
    }

}
