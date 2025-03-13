export default function mapUser(user) {
  return {
    id: user.id,
    email: user.email,
    roleId: user.role,
    createdAt: user.createdAt,
  };
}
