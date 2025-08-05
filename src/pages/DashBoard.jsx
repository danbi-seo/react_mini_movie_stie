import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSupabaseAuth } from "../supabase/auth/index";
import { useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

const DashBoardContainer = styled.div`
  width: 100%;
  color: white;
  margin-top: 20px;
  min-height: 100vh;
  padding: 20px;
`;

const ProfileHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-left: 10px;
`;

const ProfileActions = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;
`;

const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  text-align: center;
  margin-bottom: 30px;
`;

const StatItem = styled.div`
  background-color: #275cd6;
  padding: 20px 10px;
  border-radius: 8px;
`;

const StatNumber = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
`;

const StatLabel = styled.p`
  font-size: 0.8rem;
  color: #d5d3d3;
  margin-top: 5px;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #333;
  padding-bottom: 15px;
  margin-bottom: 15px;
  font-weight: bold;
`;

const ListContainer = styled.div`
  margin-bottom: 30px;
`;

const ListItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;

  border-bottom: 1px solid #333;
  &:last-child {
    border-bottom: none;
  }
`;

const ListItemText = styled.p`
  font-size: 1rem;
`;

const LifeWorkSection = styled.div`
  text-align: center;
  margin-top: 50px;
  padding-bottom: 50px;
`;

const LifeWorkTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 20px;
`;

const LifeWorkDescription = styled.p`
  font-size: 0.9rem;
  color: #a0a0a0;
  margin-bottom: 20px;
`;

const AddLifeWorkButton = styled.button`
  background-color: #275cd6;
  color: white;
  padding: 10px 20px;
  border-radius: 20px;
  font-weight: bold;
  cursor: pointer;
  border: none;
`;

const LogoutButton = styled.button`
  background-color: #333;
  color: white;
  padding: 8px 15px;
  border-radius: 5px;
  font-size: 0.9rem;
  cursor: pointer;
  border: none;
  margin-left: auto;
`;

const DashBoard = () => {
  const navigate = useNavigate();
  const { getUserInfo, logout } = useSupabaseAuth(); // signOut과 getUserInfo 훅 가져오기
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userInfo = await getUserInfo();
      console.log("user", userInfo);
      if (userInfo) {
        setUser(userInfo);
      }
    };
    fetchUserInfo();
  }, []);

  const handleLogOut = async (e) => {
    e.preventDefault();
    try {
      await logout(); // logout 호출하여 로그아웃 처리
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <DashBoardContainer>
      <ProfileHeader>
        <UserInfo>
          <UserName>{user?.user_metadata?.userName || "사용자"}</UserName>
        </UserInfo>
        <ProfileActions>
          <LogoutButton onClick={handleLogOut}>로그아웃</LogoutButton>
        </ProfileActions>
      </ProfileHeader>

      <StatGrid>
        <StatItem>
          <StatNumber>0</StatNumber>
          <StatLabel>찜했어요</StatLabel>
        </StatItem>
        <StatItem>
          <StatNumber>0</StatNumber>
          <StatLabel>보는 중</StatLabel>
        </StatItem>
        <StatItem>
          <StatNumber>0</StatNumber>
          <StatLabel>봤어요</StatLabel>
        </StatItem>
      </StatGrid>

      {/* <SectionHeader>
        본 작품 캘린더
        <IoIosArrowForward />
      </SectionHeader>
      <SectionHeader>
        본 작품 통계
        <IoIosArrowForward />
      </SectionHeader> */}

      <ListContainer>
        <ListItem>
          <ListItemText>💙 좋아요 누른 작품</ListItemText>
          <IoIosArrowForward />
        </ListItem>
        <ListItem>
          <ListItemText>💔 별로예요 누른 작품</ListItemText>
          <IoIosArrowForward />
        </ListItem>
      </ListContainer>

      <LifeWorkSection>
        <LifeWorkTitle>인생작품</LifeWorkTitle>
        <LifeWorkDescription>등록한 인생작품이 없어요</LifeWorkDescription>
        <AddLifeWorkButton>인생작품 등록하기</AddLifeWorkButton>
      </LifeWorkSection>
    </DashBoardContainer>
  );
};

export default DashBoard;
