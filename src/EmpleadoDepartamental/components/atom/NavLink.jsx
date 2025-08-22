const NavLink = ({ label, href }) => {
  return (
    <a
      href={href}
      className="text-white text-lg hover:underline transition"
    >
      {label}
    </a>
  );
};

export default NavLink;