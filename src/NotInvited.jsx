export default function NotInvited() {
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
        <div style={{ fontSize: '3rem' }}>
          🚫
        </div>
        <div style={{ fontSize: '2rem', color: '#F33800' }}>
          Kein Zugang
        </div>
        <div style={{ color: '#aaa', fontSize: '0.95rem', lineHeight: '1.5' }}>
          Du wurdest nicht eingeladen.
        </div>
        <div style={{ color: '#aaa', fontSize: '0.95rem', lineHeight: '1.5' }}>
          Bitte wende dich an die Person, die dich eingeladen hat.
        </div>
      </div>
    </div>
  );
}
