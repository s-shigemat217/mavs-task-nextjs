import AuthService from "../../services/auth/AuthService.js";
import UserService from "../../services/users/UserService.js";
import express from "express";

const router = express.Router();
const userService = new UserService();
const authService = new AuthService();

// 登録パラメーターのバリデーション
const validateRegisterParams = ({ name, email, password }) => {
  if (!name || !email || !password) {
    return false;
  }

  return true;
};

/**
 * サインイン
 */
router.post("/signin", async (req, res, next) => {
  try {
    // リクエストパラメーター
    const { email, password } = req.body;

    if (!email) return res.status(200).json({});

    // ユーザー存在チェックを行う
    const resSearchUser = await userService.searchUser("", "", email, password);

    // パラメータ存在しない場合は再ログインを促すため、空で返却する
    if (!resSearchUser.length) return res.status(200).json({});

    console.log(email);

    // トークンを発行する
    const resCreateToken = await authService.createToken(email);

    // 返却用データを生成
    const body = {
      email: email,
      token: resCreateToken,
    };

    res.status(200).json(body);
  } catch (error) {
    console.error(error);
    res.status(500).json({});
  }
});

// サインアップ
router.post("/register", async (req, res) => {
  try {
    console.log(req.body); // デバッグ用
    // リクエストパラメーター
    const name = req.body.name?.trim();
    const email = req.body.email?.trim();
    const password = req.body.password;

    if (!validateRegisterParams({ name, email, password })) {
      return res.status(400).json({
        message: "Name, email, and password are required.",
      });
    }

    // email で既存ユーザー確認
    const existingUser = await userService.findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({
        message: "This email is already registered",
      });
    }

    // ユーザー登録
    const newUser = await userService.registerUser(name, email, password);

    // ユーザー登録後、トークンを発行する
    const token = await authService.createToken(newUser.email);

    return res.status(201).json({
      name: newUser.name,
      email: newUser.email,
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "server error",
    });
  }
});

export default router;
