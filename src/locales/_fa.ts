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
  personal_info: {
    fullname: 'نام و نام خانوادگی',
    username: 'نام کاربری',
    national_code: 'کد ملی',
    change_password: 'تغییر رمز عبور',
  },
  transaction_history: {
    date: 'تاریخ',
    time: 'ساعت',
    balance: 'موجودی',
    price: 'مبلغ',
    remaining: 'باقی مانده',
    wallet: 'کیف پول',
    increase_balance: 'افزایش موجودی',
    currency_toman: 'تومان',
    filter_date: {
      all: 'همه',
      this_week: 'این هفته',
      specific_date: 'بازه‌ی خاص',
    },
  },
} as const;
