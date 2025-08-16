import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSupabaseAuth } from "../supabase/auth/index";
import { useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link } from "react-router-dom";

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
  cursor: pointer;
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
  cursor: pointer;
  border-bottom: 1px solid #333;
  &:last-child {
    border-bottom: none;
  }
`;

const ListItemText = styled.p`
  font-size: 1rem;
`;

const BestMoviesSection = styled.div`
  text-align: center;
  margin-top: 30px;
  padding-bottom: 50px;
`;

const BestMoviesTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 20px;
`;

const BestMoviesContainer = styled.p`
  font-size: 0.9rem;
  color: #a0a0a0;
  margin-bottom: 20px;
`;

const AddBestMoviesButton = styled.button`
  background-color: #275cd6;
  color: white;
  padding: 10px 20px;
  border-radius: 20px;
  font-weight: bold;
  cursor: pointer;
  border: none;
  margin-top: 30px;
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

const BestMoviesRow = styled.div`
  margin-top: 16px;
`;

const BestCard = styled(Link)`
  display: block;
  text-decoration: none;
  color: #fff;
`;

const BestPoster = styled.img`
  width: 100%;
  aspect-ratio: 2 / 3; /* 2:3 포스터 */
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.35);
`;

const BestTitle = styled.div`
  margin-top: 6px;
  font-size: 0.9rem;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DashBoard = () => {
  const navigate = useNavigate();
  const { getUserInfo, logout } = useSupabaseAuth(); // signOut과 getUserInfo 훅 가져오기
  const [user, setUser] = useState(null);
  const [wishCount, setWishCount] = useState(0);
  const [watchingCount, setWatchingCount] = useState(0);
  const [watchedCount, setWatchedCount] = useState(0);
  const [bestMovies, setBestMovies] = useState([]);

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

  // 로컬스토리지에서 좋아요와 별로예요 리스트 불러오기
  useEffect(() => {
    const likeMovies = JSON.parse(localStorage.getItem("likeMovies")) || [];
    const dislikeMovies =
      JSON.parse(localStorage.getItem("dislikeMovies")) || [];
    // 좋아요 + 별로예요 누른 영화 합산하여 "봤어요" 개수로 설정
    setWatchedCount(likeMovies.length + dislikeMovies.length);
  }, []);

  const moviesCounts = () => {
    const wl = JSON.parse(localStorage.getItem("wishList") || "[]");
    const wcl = JSON.parse(localStorage.getItem("watchingList") || "[]");
    const wd = JSON.parse(localStorage.getItem("watchedList") || "[]");
    setWishCount(wl.length);
    setWatchingCount(wcl.length);
    setWatchedCount(wd.length);
  };

  useEffect(() => {
    moviesCounts();
    // 다른 탭에서 변경 시 동기화
    const onStorage = (e) => {
      if (["wishList", "watchingList", "watchedList"].includes(e.key)) {
        moviesCounts();
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // 인생작품 + 스토리지
  useEffect(() => {
    const loadBest = () => {
      const list = JSON.parse(localStorage.getItem("bestMovies") || "[]");
      const unique = Array.isArray(list)
        ? list.filter((m, i, arr) => i === arr.findIndex((x) => x.id === m.id))
        : [];
      const sorted = unique.sort(
        (a, b) => (b.timestamp ?? 0) - (a.timestamp ?? 0)
      );
      setBestMovies(sorted);
    };
    loadBest();
    const onStorage = (e) => {
      if (e.key === "bestMovies") loadBest();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const handleLikeMovies = () => navigate("/likemovies");
  const handleDisLikeMovies = () => navigate("/dislikemovies");
  const handleWishList = () => navigate("/wishlist");
  const handleWatching = () => navigate("/watching");
  const handleWatched = () => navigate("/watched");

  const handleLogOut = async (e) => {
    e.preventDefault();
    try {
      await logout(); // logout 호출하여 로그아웃 처리
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const getDisplayName = (user) => {
    if (!user) return "사용자";
    const fromCustom = user.user_metadata?.userName;
    const fromMeta = user.user_metadata?.name || user.user_metadata?.full_name;
    return fromCustom || fromMeta || "사용자";
  };

  return (
    <DashBoardContainer>
      <ProfileHeader>
        <UserInfo>
          <UserName>{getDisplayName(user)}</UserName>
        </UserInfo>
        <ProfileActions>
          <LogoutButton onClick={handleLogOut}>로그아웃</LogoutButton>
        </ProfileActions>
      </ProfileHeader>

      <StatGrid>
        <StatItem onClick={handleWishList}>
          <StatNumber>{wishCount}</StatNumber>
          <StatLabel>찜했어요</StatLabel>
        </StatItem>
        <StatItem onClick={handleWatching}>
          <StatNumber>{watchingCount}</StatNumber>
          <StatLabel>보는 중</StatLabel>
        </StatItem>
        <StatItem onClick={handleWatched}>
          <StatNumber>{watchedCount}</StatNumber>
          <StatLabel>봤어요</StatLabel>
        </StatItem>
      </StatGrid>

      <ListContainer>
        <ListItem onClick={handleLikeMovies}>
          <ListItemText>💙 좋아요 누른 작품</ListItemText>
          <IoIosArrowForward />
        </ListItem>
        <ListItem onClick={handleDisLikeMovies}>
          <ListItemText>💔 별로예요 누른 작품</ListItemText>
          <IoIosArrowForward />
        </ListItem>
      </ListContainer>

      <BestMoviesSection>
        <BestMoviesTitle>인생영화</BestMoviesTitle>
        {bestMovies.length === 0 ? (
          <>
            <BestMoviesContainer>등록한 인생영화가 없어요</BestMoviesContainer>
            <AddBestMoviesButton onClick={() => navigate("/bestmovies")}>
              인생영화 등록하기
            </AddBestMoviesButton>
          </>
        ) : (
          <>
            <BestMoviesRow>
              <Swiper slidesPerView={4.5} spaceBetween={12}>
                {bestMovies.map((m) => (
                  <SwiperSlide key={m.id}>
                    <BestCard to={`/movie/${m.id}`}>
                      <BestPoster
                        src={
                          m.poster_path
                            ? `https://image.tmdb.org/t/p/w342${m.poster_path}`
                            : "/placeholder.jpg"
                        }
                        alt={m.title}
                      />
                      <BestTitle>{m.title}</BestTitle>
                    </BestCard>
                  </SwiperSlide>
                ))}
              </Swiper>
            </BestMoviesRow>
            <AddBestMoviesButton onClick={() => navigate("/bestmovies")}>
              더 보기
            </AddBestMoviesButton>
          </>
        )}
      </BestMoviesSection>
    </DashBoardContainer>
  );
};

export default DashBoard;
