import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import NavTop from './NavTop';
import NavBottom from './NavBottom';
import { useEffect } from 'react';

const LayoutContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 780px;
  height: 100%;
  margin: 0 auto;
  flex-direction: column;
  flex-grow: 1;
  padding: 0;
`;

const ContentWrapper = styled.div`
  flex-grow: 1;
  width: 100%;
  justify-content: center;
  display: flex;
  flex-direction: column;
  /* height: 100%; */
  /* align-items: center; */
`;

const Layout = () => {
  const location = useLocation(); // 현재 URL 위치 정보 가져오기
  const isDetailPage = location.pathname.includes('/movie/');
  const isMyPage = location.pathname === '/mypage';

  useEffect(() => {
    if(isMyPage) {
      document.body.classList.add('mypage-background');
    } else {
      document.body.classList.remove('mypage-background');
    }
    return () => {
      document.body.classList.remove('mypage-background');
    }
  }, [location.pathname, isMyPage])
  
  // framer-motion 으로 페이지마다 이동할때 애니메이션 
  const pageAnimate = {
    initial: { opacity: 0.5},
    animate: { opacity: 1},
    exit: { opacity: 0.5}
  }
  /**
   * Framer Motion 라이브러리에서 애니메이션 상태를 정의하는 variants (변형) 객체의 일부
   * initial : 컴포넌트가 화면에 나타날때
   * animate : 컴포넌트가 Initial상태에서 애니메이션이 될 최종 상태
   * exit : 컴포넌트가 화면에서 언마운트될 때 최종상태
   */ 
  const myPageStyle = isMyPage ? {
    width: '100vw', 
    position: 'relative', 
    left: '50%',
    transform: 'translateX(-50%)',
    height: '100vh',
    minHeight: `calc(100vh - ${isDetailPage ? 0 : 50}px - 60px)` // NavTop(50px)과 NavBottom(60px) 높이 제외
  } : {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center'
  };

  return (
    <LayoutContainer>
      <NavTop /> 
        <ContentWrapper>
          <AnimatePresence mode='wait'>
            <motion.div
              key={location.pathname}
              variants={pageAnimate}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.2 }}
              style={{display: 'flex', width:'100%', height: '100%', justifyContent: 'center'}}>
              {/* Outlet은 라우팅된 페이지 컴포넌트가 렌더링될 위치 */}
              <Outlet />
            </motion.div>  
          </AnimatePresence>
        </ContentWrapper>
      <NavBottom />
    </LayoutContainer>
  );
};

export default Layout;