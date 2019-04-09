import SelfBooks from '@/components/SelfBooks'
import BookShelf from '@/components/BookShelf'
import Setting from '@/components/Setting'
import Bookinfo from '@/components/Bookinfo'
import BookEntry from '@/components/BookEntry'
import Help from '@/components/Help'
import Borrowing from '@/components/Borrowing'

export default [
    {
      path: '/',
      name: 'SelfBooks',
      component: SelfBooks,
      meta:{
        title:'我的借阅'
      }
    },
    {
      path: '/SelfBooks',
      name: 'SelfBooks',
      component: SelfBooks,
      meta:{
        title:'我的借阅'
      }
    },
    {
      path: '/BookShelf',
      name: 'BookShelf',
      component: BookShelf,
      meta:{
        title:'书架'
      }
    },
    {
      path: '/Setting',
      name: 'Setting',
      component: Setting,
      meta:{
        title:'设置'
      }
    },
    {
      path: '/Help',
      name: 'Help',
      component: Help,
      meta:{
        title:'帮助中心'
      }
    },
    {
      path: '/Bookinfo/:isbn',
      name: 'Bookinfo',
      component: Bookinfo,
      meta:{
        title:'图书详情'
      }
    },
    {
      path: '/BookEntry/:isbn',
      name: 'BookEntry',
      component: BookEntry,
      meta:{
        title:'图书入库'
      }
    },
    {
      path: '/Borrowing/:isbn',
      name: 'Borrowing',
      component: Borrowing,
      meta:{
        title:'扫码借书'
      }
    }

  ]
// })
