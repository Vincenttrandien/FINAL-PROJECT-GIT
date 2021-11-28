package greenwich.englishcenter.backend.Controllers;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.validation.Valid;

import greenwich.englishcenter.backend.Entity.enumms.ERole;
import greenwich.englishcenter.backend.Entity.Role;
import greenwich.englishcenter.backend.Entity.User;
import greenwich.englishcenter.backend.Form.request.LoginRequest;
import greenwich.englishcenter.backend.Form.request.SignupRequest;
import greenwich.englishcenter.backend.Form.response.JwtResponse;
import greenwich.englishcenter.backend.Repository.IRoleRepository;
import greenwich.englishcenter.backend.Security.jwt.JwtUtils;
import greenwich.englishcenter.backend.Security.services.UserDetailsImpl;
import greenwich.englishcenter.backend.Service.impl.NotificationServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import greenwich.englishcenter.backend.Form.response.MessageResponse;
import greenwich.englishcenter.backend.Repository.IUserRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/greenwich/EnglishCenter")
public class AuthController {
	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	IUserRepository userRepository;


	@Autowired
	NotificationServiceImpl notificationService;

	@Autowired
	IRoleRepository roleRepository;

	@Autowired
	PasswordEncoder encoder;

	@Autowired
    JwtUtils jwtUtils;

	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtils.generateJwtToken(authentication);
		
		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
		List<String> roles = userDetails.getAuthorities().stream()
				.map(item -> item.getAuthority())
				.collect(Collectors.toList());

		return ResponseEntity.ok(new JwtResponse(jwt,
												 userDetails.getId(), 
												 userDetails.getUsername(), 
												 userDetails.getEmail(),
												 userDetails.getMajor(),
												 userDetails.getCodeClass(),
												 userDetails.getYear(),
												 roles));
	}

	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
		if (userRepository.existsByUsername(signUpRequest.getUsername())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Username is already taken!"));
		}

		if (userRepository.existsByEmail(signUpRequest.getEmail())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Email is already in use!"));
		}

		// Create new user's account
		User user = new User(signUpRequest.getUsername(),
							 signUpRequest.getEmail(),
							 signUpRequest.getMajor(),
//				             signUpRequest.getPassword(),
						     encoder.encode(signUpRequest.getPassword()),
				             signUpRequest.getYear());

		Set<String> strRoles = signUpRequest.getRoles();
		Set<Role> roles = new HashSet<>();

		if (strRoles == null) {
			Role userRole = roleRepository.findByName(ERole.USER)
					.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
			roles.add(userRole);
		} else {
			strRoles.forEach(role -> {
				switch (role) {
				case "Admin":
					Role adminRole = roleRepository.findByName(ERole.ADMIN)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(adminRole);

					break;
				case "Teacher":
					Role teacherRole = roleRepository.findByName(ERole.TEACHER)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(teacherRole);

					break;
					case "Student":
						Role studentRole = roleRepository.findByName(ERole.STUDENT)
								.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
						roles.add(studentRole);

						break;

					case "Customer Service":
						Role serviceRole = roleRepository.findByName(ERole.CUSTOMER_SERVICE)
								.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
						roles.add(serviceRole);

						break;
				default:
					Role userRole = roleRepository.findByName(ERole.USER)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(userRole);
				}
			});
		}

		user.setRoles(roles);
		notificationService.sendNotification(user);
		userRepository.save(user);

		return ResponseEntity.ok(new MessageResponse("Successful!"));
	}
}
