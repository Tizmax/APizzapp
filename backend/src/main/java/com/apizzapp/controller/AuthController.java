// @RestController
// @RequestMapping("/api/auth")
// public class AuthController {

//     @Autowired
//     private UserService userService;

//     @PostMapping("/login")
//     public ResponseEntity<?> login(@RequestBody AuthRequest request) {
//         User user = userService.authenticate(request.getUsername(), request.getPassword());
//         if (user == null) {
//             return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
//         }
//         return ResponseEntity.ok(Map.of("role", user.getRole()));
//     }
// }
