import styled from 'styled-components';


const NavContainer = styled.nav`
  width: 100%;
  height: auto;
  background-color: #000000;
  display: flex;
  justify-content: space-between;
  color: white;
  padding-left: 20px;
  align-items: center;
  position: sticky;
  z-index: 100;
`

const NavSearch = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
`

const NavButtons = styled.div`
  display: flex;
  gap: 10px; 
  padding-right: 20px;
`

const NavButton = styled.button`
  background-color: #f5c518; /* IMDb 버튼 색상 */
  color: white;
  height: 30px;
  margin: 5px;
  padding: 3px;
  border-radius: 5px;
`

const NavBar = () => {
  return(
    <NavContainer>
      <span className='w-[500px]'>Movie DB</span>
      <NavButtons>
        <NavButton>로그인</NavButton>
        <NavButton>회원가입</NavButton>
      </NavButtons>
    </NavContainer>
  )
}

export default NavBar;