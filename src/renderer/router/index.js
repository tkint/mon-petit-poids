import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/home/Home';
import Profile from '@/components/profile/Profile';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/profile/:id',
      name: 'Profile',
      component: Profile,
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
