import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import NavBar from './NavBar';
import { AnimatePresence, motion } from 'framer-motion';

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const ContentWrapper = styled.div`
  flex-grow: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Layout = () => {
  const location = useLocation(); // 현재 URL 위치 정보 가져오기

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


  return (
    <LayoutContainer>
      <NavBar /> 
      <ContentWrapper>
        <AnimatePresence mode='wait'>
          <motion.div
            key={location.pathname}
            variants={pageAnimate}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.2 }}
            style={{display: 'flex', width: '100%'}}>
            <Outlet />
          </motion.div>  
        </AnimatePresence>
      </ContentWrapper>
    </LayoutContainer>
  );
};

export default Layout;