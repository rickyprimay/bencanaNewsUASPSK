const Sidebar = () => {
  return (
    <>
    <aside className="w-64 bg-teal-600 text-white flex flex-col">
        <div className="p-6 text-2xl font-bold border-b border-teal-500">
          Dashboard BenKir News
        </div>
        <nav className="flex-grow">
          <ul className="menu p-4 space-y-4">
            <li>
              <a href="/dashboard" className="hover:bg-teal-700 rounded py-2 px-4">Home</a>
            </li>
          </ul>
        </nav>
        <div className="p-4 border-t border-teal-500">
          <a href="/" className="btn btn-outline btn-sm text-white w-full hover:bg-red-600 py-2">
            Kembali
          </a>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;