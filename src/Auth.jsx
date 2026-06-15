export default function Auth() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: '#111',
      padding: '2rem'
    }}>
      <div style={{
        background: '#1a1a1a',
        border: '2px solid #F33800',
        borderRadius: '1.5rem',
        padding: '3rem 2.5rem',
        textAlign: 'center',
        maxWidth: '400px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <div style={{ fontSize: '2rem', color: '#F33800' }}>
          Entweder Oder
        </div>
        <div style={{ color: '#aaa', fontSize: '0.95rem', lineHeight: '1.5' }}>
          Du wurdest eingeladen zu spielen.
        </div>
        <div style={{ color: '#aaa', fontSize: '0.95rem', lineHeight: '1.5' }}>
          Überprüfe deine E-Mails für den Login-Link.
        </div>
        <div style={{
          marginTop: '1rem',
          background: '#F33800',
          color: 'white',
          borderRadius: '2rem',
          padding: '0.4rem 1.2rem',
          fontSize: '0.8rem',
          letterSpacing: '0.1em',
          display: 'inline-block',
          alignSelf: 'center'
        }}>
          Nur auf Einladung
        </div>
      </div>
    </div>
  );
}
