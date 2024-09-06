export default {
  hello: 'سلام {first_name} {last_name}',
  auth: {
    heading: 'سلام. خوش اومدی!',
    caption: 'برای استفاده از خدمات وبسایت، لطفا وارد شو.',
    username: 'نام کاربری',
    password: 'رمز عبور',
    forgot_password: 'رمزت یادت رفته؟ :/ ',
    login: 'ورود',
    support: 'پشتیبانی',
    errors: {
      username_empty: 'نام کاربری نمیتواند خالی باشد',
      password_empty: 'رمز عبور نمیتواند خالی باشد',
    },
  },
} as const;
