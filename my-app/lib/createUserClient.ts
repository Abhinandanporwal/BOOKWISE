export async function createUserClient() {
    await fetch('/api/createuser', {
      method: 'POST',
    });
  }
  