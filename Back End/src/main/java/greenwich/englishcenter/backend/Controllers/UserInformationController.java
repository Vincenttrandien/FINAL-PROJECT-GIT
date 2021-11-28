package greenwich.englishcenter.backend.Controllers;


import greenwich.englishcenter.backend.Entity.User;
import greenwich.englishcenter.backend.Exception.ServiceException;
import greenwich.englishcenter.backend.Form.response.PagingResponse;
import greenwich.englishcenter.backend.Service.IUserInformationService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/greenwich/EnglishCenter/UserInform")
public class UserInformationController {

    @Autowired
    private IUserInformationService userInformationService;

    @GetMapping(value = "/{id}")
    public ResponseEntity<User> findById(@PathVariable("id") String id) throws ServiceException {
        return ResponseEntity.status(HttpStatus.OK).body(userInformationService.findById(id));
    }

    @GetMapping(value="/findByUsername")
    public ResponseEntity<User> findByUsername(@RequestParam String username) throws ServiceException{
        return ResponseEntity.status(HttpStatus.OK).body(userInformationService.findByUsername(username));
    }

    @GetMapping(value="/findByClass")
    public ResponseEntity<User> findByClass(@RequestParam String codeClass) throws ServiceException{
        return ResponseEntity.status(HttpStatus.OK).body(userInformationService.findByClass(codeClass));
    }

    @GetMapping(value="/getAllUser")
    public ResponseEntity<PagingResponse<User>> findAllUser
            (@RequestParam int pageNumber,
             @RequestParam int pageSize,
             @RequestParam String year) {
        return ResponseEntity.status(HttpStatus.OK).body(userInformationService.findAllUser(pageNumber,pageSize,year));
    }

    @GetMapping(value="/searchByKey")
    public ResponseEntity<PagingResponse<User>> searchByKey
            (@RequestParam int pageNumber,
             @RequestParam int pageSize,
             @RequestParam String year,
             @RequestParam String searchKey){
        return ResponseEntity.status(HttpStatus.OK).body(userInformationService.searchByKey(pageNumber, pageSize, year, searchKey));
    }

    @PutMapping(value="/{id}")
    public ResponseEntity<User> edit(@PathVariable("id") ObjectId id,
                                     @RequestBody User user) throws ServiceException{

        String cloneId =id.toHexString();

        User cloneUser = userInformationService.findById(cloneId);

        user.setId(id);
        user.setUsername(cloneUser.getUsername());
        user.setEmail(cloneUser.getEmail());
        user.setPassword(cloneUser.getPassword());
        user.setRoles(cloneUser.getRoles());

        return ResponseEntity.status(HttpStatus.OK).body(userInformationService.edit(user));
    }

    @DeleteMapping(value ={"/{id}"})
    public ResponseEntity<Boolean> remove(@PathVariable("id") String id) throws ServiceException {
        return ResponseEntity.status(HttpStatus.OK).body(userInformationService.
                delete(userInformationService.findById(id)));
    }

}
