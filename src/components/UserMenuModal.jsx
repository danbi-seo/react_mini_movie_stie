// src/components/UserMenuModal.jsx
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { LoginModal } from './LoginModal'; 

const UserMenuContainer = styled.div`
  position: absolute; 
  top: calc(100% + 10px); 
  right: 0;
  background-color: #2c3140;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
  overflow: hidden;
  z-index: 101; 
  min-width: 150px; 
`;

const MenuItem = styled(Link)`
  display: block;
  padding: 12px 15px;
  color: #e0e0e0;
  text-decoration: none;
  font-size: 0.95rem;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #3b4356;
  }
`;

const LogoutItem = styled(MenuItem)`
  color: #ff6b6b; 
  &:hover {
    background-color: #4a1f22;
  }
`;

export const UserMenuModal = ({ onClose, onLogout }) => {
  return (
    <UserMenuContainer onClick={(e) => e.stopPropagation()}> 
      <MenuItem to="/wishlist" onClick={onClose}>
        관심목록
      </MenuItem>
      <LogoutItem as="div" onClick={onLogout}> 
        로그아웃
      </LogoutItem>
    </UserMenuContainer>
  );
};