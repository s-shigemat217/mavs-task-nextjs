// import nanoid from 'nanoid';
import db from "../../models/index.js";
import AuthService from "../auth/AuthService.js";

const authService = new AuthService();
const { Users } = db;

// クラス
class UserService {
  // ユーザーデータを返却形式に整形する
  normalizeUserResponse(row) {
    return {
      id: row.dataValues.id,
      name: row.dataValues.name,
      email: row.dataValues.email,
    };
  }

  /**
   * ユーザー情報取得
   * @param ユーザーID
   * @return ユーザー情報
   */
  async getUser(user_id) {
    // ユーザーIDをキーにユーザー情報を取得する
    const rows = await Users.findOne({ where: { id: user_id } });
    // データが存在しない場合はnullを返却する
    if (!rows) {
      return null;
    }

    console.log(rows.dataValues);// デバッグ用
    // 取得したデータを返却形式に整形して格納し返却する
    return this.normalizeUserResponse(rows);
  }
  /**
   * ユーザー情報検索
   * @param 検索条件
   * @return ユーザー情報リスト
   */
  async searchUser(id, name, email, password) {
    const where = {};
    // IDが指定されている場合はIDを条件へ追加する
    if (id) {
      where.id = id;
    }
    // 名前が指定されている場合は名前を条件へ追加する
    if (name) {
      where.name = name;
    }
    // メールアドレスが指定されている場合はメールアドレスを条件へ追加する
    if (email) {
      where.email = email;
    }
    // パスワードが指定されている場合はパスワードを条件へ追加する
    if (password) {
      const hash_password = authService.hashSha256(password);
      where.password = hash_password;
    }

    // 検索実行
    const rows = await Users.findAll({ where });

    // 取得したデータを返却形式に整形して格納し返却する
    return rows.map((row) => this.normalizeUserResponse(row));
  }

  // メールアドレスをキーにユーザー情報を取得する
  async findUserByEmail(email) {
    const user = await Users.findOne({
      where: { email },
    });

    if (!user) {
      return null;
    }

    return this.normalizeUserResponse(user);
  }

  // ユーザー登録
  async registerUser(name, email, password) {
    const hashPassword = authService.hashSha256(password);

    const user = await Users.create({
      name,
      email,
      password: hashPassword,
    });

    return this.normalizeUserResponse(user);
  }
}

export default UserService;
