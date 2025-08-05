import { DTO_TYPE } from "./config";

// 수파베이스에서 받아온 객체를 쓸내용을 가져와서 반환하는 것
// User data 매핑용 함수
export const changeFromDto = ({ type, dto }) => {
  switch (type) {
    case DTO_TYPE.user:
      const { user_metadata: userInfo } = dto?.user;
      return {
        user: {
          id: userInfo.sub,
          email: userInfo.email,
          userName: userInfo.userName
            ? userInfo.userName
            : userInfo.email.split("@")[0],
          profileImageUrl: userInfo.avatar_url,
        },
      };
    case DTO_TYPE.error:
      if (!dto.error) {
        return {
          error: {
            status: 500,
            message:
              "DTO_TYPE ERROR를 확인해주세요. 데이터 내부 error 객체가 없습니다.",
          },
        };
      }
      const { error: rawError } = dto;

      return {
        error: {
          status: rawError.status,
          message: rawError.message,
        },
      };

    default:
      new Error("wrong type accessed");
      return;
  }
};
