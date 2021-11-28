import { environment } from 'src/environments/environment';

export class BaseURL {

  // Auth APIs
    public static AUTH = environment.API_BAN_THAN + '/greenwich/EnglishCenter';

}

export class CommandURL {
  //Sign up and Sign in
  public static SIGNUP = BaseURL.AUTH + '/signup';
  public static SIGNIN = BaseURL.AUTH + '/signin';

  public static CLASSROOM = BaseURL.AUTH + '/ClassRoom/';
  
  public static CONTACTS = BaseURL.AUTH + '/ContactForm/';

  public static SUPPORT = BaseURL.AUTH +'/SupportForm/';



  public static FACULTY = BaseURL.AUTH + '/Faculty/';
  public static TOPIC = BaseURL.AUTH + '/Topic/';
  public static FILES = BaseURL.AUTH + '/Files/';
  public static COMMENT = BaseURL.AUTH + '/Comment/';

  public static PICS = BaseURL.AUTH + '/photo/';

  public static SUBMISSION = BaseURL.AUTH + '/Submission/';

  // ADMIN
    public static ACCOUNTS = BaseURL.AUTH + '/UserInform';
}
