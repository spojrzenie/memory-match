type Logotype = {
  logo: string;
}

export const Logo = ({ logo }: Logotype) => {
  return (
    <header className="App-header">
      <a href="/">
        <img src={logo} className="App-logo" alt="logo" />
      </a>
    </header>
  )
};
