const mockDate = {
  user1: {
    firstName: 'HAVUGIMANA',
    lastName: 'GUSTAVE',
    email: 'gu@gmail.com',
    password: '12345sixD@',
    gender: 'MALE',
    jobRole: 'Employee',
    department: 'ELECTRICAL',
    address: 'NYARUTARAMA',
  },
  user2: {
    firstName: 'NSABIMANA',
    lastName: 'THIERY',
    email: 'tirere@gmail.com',
    password: '12345sixD@',
    gender: 'MALE',
    jobRole: 'Employee',
    department: 'IT',
    address: 'KACYIRU',
  },
  user3: {
    firstName: 'CONFIANCE',
    lastName: 'ELYSE',
    email: '',
    password: '12345six',
    gender: 'MALE',
    jobRole: 'Employee',
    department: 'ELECTRICAL',
    address: 'KABEZA',
  },
  user4: {
    id: 3,
    firstName: 'HAVUGIMANA',
    lastName: 'GUSTAVE',
    email: 'gu@gmail.com',
    password: '12345six',
    gender: 'MALE',
    jobRole: 'Employee',
    department: 'ELECTRICAL',
    address: 'NYARUTARAMA',
    isAdmin: false,
  },
  guest: {
    id: 2,
    firstName: 'BYUSA',
    lastName: 'PRINCE DACY',
    email: 'byusa@gmail.com',
    password: '$2b$10$lcLHDlw0YPQ1nLDbodynveS/yx6K.SamH6TwzalYEHoijm1W0jouu',
    gender: 'MALE',
    jobRole: 'Employee',
    department: 'FINANCE',
    address: 'UMUSAVE',
    isAdmin: false,
  },
  Adminuser: {
    id: 1,
    firstName: 'NIYONSENGA',
    lastName: 'ERIC',
    email: 'niyeric11@gmail.com',
    password: '$2b$10$lcLHDlw0YPQ1nLDbodynveS/yx6K.SamH6TwzalYEHoijm1W0jouu',
    gender: 'MALE',
    jobRole: 'HOD',
    department: 'IT',
    address: 'KACYIRU',
    isAdmin: true,
  },
  loginInvalidUspass: {
    email: 'gu@gmail.com',
    password: '12345678six',
  },
  loginInvalidUsermail: {
    email: 'gu8@gmail.com',
    password: '12345six',
  },
  loginsuccess: {
    email: 'gu@gmail.com',
    password: '12345sixD@',
  },
  loginEmpty: {
    email: 'gu@gmail.com',
    password: '',
  },
  article1: {
    title: 'Bana Bato',
    article: 'GOD is good all the time',
  },
  article2: {
    title: 'FootBall Life',
    article: 'FootBall is some thing good for the ones that play it and to the one who like it',
  },
  comment1: {
    comment: 'interesting',
  },
  flagReason: {
    reason: 'this article is against human rights',
  },
  flagReason2: {
    reason: 'Abusing',
  },


};
export default mockDate;
