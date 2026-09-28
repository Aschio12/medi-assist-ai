'use server';

export async function deployNanobotSwarm(targetSite: string, swarmSize: number = 10000) {
  try {
    const res = await fetch('http://localhost:8023/api/nanobot/deploy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        target_site: targetSite,
        swarm_size: swarmSize
      })
    });
    
    if (!res.ok) throw new Error(`Swarm deployment failed: ${res.statusText}`);
    return await res.json();
  } catch (error) {
    console.error("Nanobot Deployment Error:", error);
    return null;
  }
}
