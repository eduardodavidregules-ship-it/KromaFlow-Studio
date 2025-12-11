'use client';

import React, { useState, useEffect } from 'react';
import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/nextjs';
import { FiHome, FiVideo, FiFolder, FiSettings, FiShield, FiPlay, FiDownload, FiToggleRight, FiArrowRight, FiCheck, FiZap, FiLoader, FiTag, FiGift, FiCopy, FiEdit3, FiSend, FiCpu, FiCornerUpLeft } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

// CONFIG
const PUBLISHABLE_KEY = "pk_test_ZmFpci1nb29zZS02Mi5jbGVyay5hY2NvdW50cy5kZXYk";
const ADMIN_EMAIL = "eduardodavid.regules@gmail.com";

// --- INLINE STYLES SYSTEM ("Cosmic Dawn" v5.0 Final) ---
const S = {
    // LAYOUT - ULTRA DEEP
    container: {
        display: 'flex',
        height: '100vh',
        width: '100vw',
        backgroundColor: '#020617', // Absolute Dark
        // Cinematic Background: Complex stacking of radial gradients to simulate a nebula/stars environment
        backgroundImage: `
            radial-gradient(circle at 15% 50%, rgba(168, 85, 247, 0.08) 0%, transparent 25%),
            radial-gradient(circle at 85% 30%, rgba(34, 211, 238, 0.08) 0%, transparent 25%),
            radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.03) 0%, transparent 40%),
            linear-gradient(180deg, rgba(2, 6, 23, 0) 0%, #020617 100%)
        `,
        color: 'white',
        fontFamily: "'Outfit', sans-serif",
        overflow: 'hidden',
    },
    sidebar: {
        width: '280px',
        height: '100%',
        backgroundColor: 'rgba(2, 6, 23, 0.7)', // Slightly more opaque for contrast
        borderRight: '1px solid rgba(255, 255, 255, 0.04)',
        display: 'flex',
        flexDirection: 'column' as const,
        padding: '32px',
        backdropFilter: 'blur(24px) saturate(180%)', // Premium Glass Effect
        zIndex: 50,
    },
    main: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column' as const,
        overflowY: 'auto' as const,
        position: 'relative' as const,
    },
    header: {
        height: '90px',
        padding: '0 48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid rgba(255, 255, 255, 0.03)',
        backgroundColor: 'rgba(2, 6, 23, 0.4)',
        backdropFilter: 'blur(16px)',
        zIndex: 40,
        position: 'sticky' as const,
        top: 0,
    },
    logo: {
        fontSize: '26px',
        fontWeight: 'bold',
        marginBottom: '48px',
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        color: 'white',
        letterSpacing: '-0.5px',
        textShadow: '0 0 30px rgba(168, 85, 247, 0.4)',
    },
    logoIcon: {
        width: '36px',
        height: '36px',
        borderRadius: '10px',
        background: 'linear-gradient(135deg, #A855F7, #22D3EE)',
        boxShadow: '0 0 25px rgba(168, 85, 247, 0.6)',
    },
    navItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        padding: '14px 18px',
        borderRadius: '14px',
        cursor: 'pointer',
        color: '#94a3b8',
        marginBottom: '6px',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        fontSize: '15px',
        fontWeight: '500',
    },
    navItemActive: {
        backgroundColor: 'rgba(168, 85, 247, 0.08)',
        color: '#fff',
        border: '1px solid rgba(168, 85, 247, 0.2)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
    },
    btnPrimary: {
        background: 'linear-gradient(90deg, #A855F7, #22D3EE)',
        border: 'none',
        padding: '14px 32px',
        borderRadius: '99px',
        color: 'white',
        fontWeight: 'bold',
        cursor: 'pointer',
        boxShadow: '0 0 30px rgba(168, 85, 247, 0.4)', // Strong cinematic glow
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        fontSize: '15px',
        transition: 'all 0.3s ease',
    },
    btnSecondary: {
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        padding: '14px 28px',
        borderRadius: '99px',
        color: 'white',
        fontWeight: 'bold',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        fontSize: '15px',
        transition: 'all 0.3s ease',
        backdropFilter: 'blur(10px)',
    },
    card: {
        background: 'rgba(255, 255, 255, 0.02)',
        borderRadius: '24px',
        border: '1px solid rgba(255, 255, 255, 0.04)',
        padding: '32px',
        flex: 1,
        backdropFilter: 'blur(10px)',
        boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.3)', // Cinematic shadow
    },
    videoCardPro: {
        background: 'linear-gradient(145deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.6) 100%)',
        borderRadius: '24px',
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.06)',
        boxShadow: '0 20px 50px rgba(0,0,0,0.4)', // Deep shadow
        cursor: 'pointer',
        backdropFilter: 'blur(20px)',
    },
    inputLarge: {
        width: '100%',
        padding: '24px',
        fontSize: '18px',
        backgroundColor: 'rgba(0,0,0,0.2)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '16px',
        color: 'white',
        marginBottom: '24px',
        outline: 'none',
        transition: 'all 0.3s ease',
        backdropFilter: 'blur(10px)',
    },
    landing: {
        position: 'fixed' as const,
        inset: 0,
        backgroundColor: '#020617',
        backgroundImage: `
            radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 100% 0%, rgba(34, 211, 238, 0.1) 0%, transparent 40%)
        `,
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    // REUSING OTHERS FROM PREVIOUS BUT ENSURING THEY EXIST FOR COMPATIBILITY
    priceCard: {
        background: 'rgba(255, 255, 255, 0.02)',
        borderRadius: '28px',
        padding: '36px',
        flex: 1,
        border: '1px solid rgba(255, 255, 255, 0.04)',
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '24px',
        position: 'relative' as const,
        backdropFilter: 'blur(10px)',
    },
    priceCardFeatured: {
        background: 'linear-gradient(145deg, rgba(168, 85, 247, 0.1), rgba(34, 211, 238, 0.05))',
        border: '1px solid rgba(168, 85, 247, 0.4)',
        transform: 'scale(1.05)',
        boxShadow: '0 0 60px rgba(168, 85, 247, 0.15)',
        zIndex: 10,
    },
     priceAmount: {
        fontSize: '48px',
        fontWeight: 'bold',
        color: 'white',
        display: 'flex',
        alignItems: 'baseline',
        gap: '8px',
        textShadow: '0 4px 20px rgba(0,0,0,0.5)',
        letterSpacing: '-2px',
    },
    btnPlan: {
        width: '100%',
        padding: '20px',
        borderRadius: '18px',
        fontWeight: 'bold',
        fontSize: '16px',
        border: 'none',
        cursor: 'pointer',
        marginTop: 'auto',
        transition: 'all 0.2s',
    },
    textAreaScript: {
        width: '100%',
        height: '500px',
        padding: '28px',
        fontSize: '16px',
        backgroundColor: 'rgba(2, 6, 23, 0.6)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '20px',
        color: '#e2e8f0',
        marginBottom: '24px',
        outline: 'none',
        fontFamily: "'JetBrains Mono', monospace",
        lineHeight: '1.7',
        resize: 'none' as const,
        backdropFilter: 'blur(10px)',
    },
    overlay: {
        position: 'fixed' as const,
        inset: 0,
        backgroundColor: '#020617',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
        justifyContent: 'center',
    },
    core: {
        width: '150px',
        height: '150px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, #fff 0%, #A855F7 30%, transparent 70%)',
        boxShadow: '0 0 100px rgba(34, 211, 238, 0.6), 0 0 150px rgba(168, 85, 247, 0.4)',
        marginBottom: '60px',
    },
    consoleBox: {
        fontFamily: "'JetBrains Mono', monospace",
        color: '#22D3EE',
        fontSize: '16px',
        height: '40px',
        marginBottom: '40px',
        textShadow: '0 0 15px rgba(34, 211, 238, 0.8)',
    },
    timelineContainer: {
        width: '60%',
        height: '6px',
        backgroundColor: '#1e293b',
        position: 'relative' as const,
        borderRadius: '6px',
        maxWidth: '800px',
        overflow: 'hidden',
    },
    sceneBlock: {
        position: 'absolute' as const,
        top: '0',
        height: '100%',
        width: '5%',
        backgroundColor: '#A855F7',
        boxShadow: '0 0 20px rgba(168, 85, 247, 0.8)',
    },
    titleSimple: {
        fontSize: '80px',
        fontWeight: '800',
        marginBottom: '24px',
        background: 'linear-gradient(to bottom, #fff 0%, #94a3b8 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        letterSpacing: '-3px',
    },
    subtitleSimple: {
        fontSize: '22px',
        color: '#64748b',
        marginBottom: '48px',
        fontWeight: '300',
        letterSpacing: '1px',
    },
    btnSimple: {
        background: 'white',
        color: '#020617',
        padding: '22px 56px',
        borderRadius: '99px',
        fontSize: '18px',
        fontWeight: 'bold',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        zIndex: 10,
        boxShadow: '0 0 50px rgba(255,255,255,0.2)',
    }
};

// --- AUTHENTICATED APP ---
const KromaApp = () => {
    const { user } = useUser();
    const isAdmin = user?.primaryEmailAddress?.emailAddress === ADMIN_EMAIL;
    
    // --- APP STATE ---
    const [tab, setTab] = useState('Dashboard');
    const [videos, setVideos] = useState<any[]>([]);
    const [userPlan, setUserPlan] = useState<'free' | 'pro' | 'ultra'>('free');
    
    // --- STUDIO STATE ---
    const [creationStep, setCreationStep] = useState(0); 
    const [videoTopic, setVideoTopic] = useState('');
    const [channelName, setChannelName] = useState('');
    const [strategy, setStrategy] = useState('Análisis (20m)');
    const [generatedScript, setGeneratedScript] = useState('');

    // --- EDITING STATE ---
    const [editingVideoId, setEditingVideoId] = useState<number | null>(null);
    const [editPrompt, setEditPrompt] = useState('');

    // --- RENDER STATE ---
    const [generating, setGenerating] = useState(false);
    const [genLog, setGenLog] = useState('');
    const [scenes, setScenes] = useState<number[]>([]);
    const [downloadingId, setDownloadingId] = useState<number | null>(null);

    // --- ADMIN STATE ---
    const [couponPrefix, setCouponPrefix] = useState('');
    const [discountCode, setDiscountCode] = useState('');
    const [selectedDiscount, setSelectedDiscount] = useState('15%');
    const [giftLink, setGiftLink] = useState('');
    const [selectedGiftPlan, setSelectedGiftPlan] = useState('PRO');
    const [selectedDuration, setSelectedDuration] = useState('1 Mes');

    // --- ADMIN LOGIC ---
    const generateDiscount = () => {
        const prefix = couponPrefix.toUpperCase().replace(/\s/g, '') || 'KROMA';
        const suffix = Math.random().toString(36).substr(2, 4).toUpperCase();
        setDiscountCode(`${prefix}-${suffix}`);
    };

    const generateGiftLink = () => {
        const durMap: {[key:string]: string} = { 'Para Siempre': 'PERMANENT', '1 Año': '1YEAR', '3 Meses': '3MONTHS', '1 Mes': '1MONTH' };
        const durationCode = durMap[selectedDuration] || '1MONTH';
        const token = `${selectedGiftPlan}-${durationCode}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
        setGiftLink(`https://kromaflow.ai/redeem?plan=${selectedGiftPlan}&duration=${durationCode}&token=${token}`);
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        alert(`Copiado: ${text}`);
    };

    // --- CORE LOGIC ---
    const handleDraftScript = () => {
        const limits = { free: 2, pro: 18, ultra: 9999 };
        if (videos.length >= limits[userPlan]) {
            alert(`⚠️ Límite de plan ${userPlan.toUpperCase()} alcanzado.`);
            setTab('Ajustes');
            return;
        }
        if (!videoTopic) { alert("Ingresa un tema."); return; }
        
        // Simulación básica de guion para no bloquear
        setGeneratedScript(`INTRO:\nEl tema es ${videoTopic} para el canal ${channelName || 'Misterio'}...\n\n[Bloque 1]...`);
        setCreationStep(1);
    };

    const handleStartRender = (isEdit: boolean = false) => {
        if (!isEdit) setCreationStep(2);
        setGenerating(true);
        setScenes([]);

        // ANIMATION LOOP
        let count = 0;
        const interval = setInterval(() => {
            count++;
            setScenes(p => [...p, count]);
            if (count >= 10) clearInterval(interval);
        }, isEdit ? 600 : 800);

        // SEQUENTIAL LOGS
        const msgs = isEdit ? ["Analizando...", "Aplicando FX...", "Finalizando..."] : ["Iniciando Motor...", "Generando Clips...", "Renderizando..."];
        msgs.forEach((m, i) => setTimeout(() => setGenLog(m), i * 2000));

        setTimeout(() => {
            setGenerating(false);
            if (isEdit) {
                 const oldVid = videos.find(v => v.id === editingVideoId);
                 if (oldVid) {
                    const newVid = { ...oldVid, id: Date.now(), title: `${oldVid.title} (v2)` };
                    setVideos(p => [newVid, ...p]);
                    alert("✅ Versión v2 creada.");
                 }
                 setTab('Mis Videos');
                 setEditingVideoId(null);
                 setEditPrompt('');
            } else {
                const newVid = { id: Date.now(), title: videoTopic, duration: "12:30", expiry: "30 días", plan: userPlan };
                setVideos(p => [newVid, ...p]);
                setTab('Mis Videos');
                setTimeout(() => { setCreationStep(0); setVideoTopic(''); setScenes([]); setGeneratedScript(''); }, 500);
            }
        }, isEdit ? 8000 : 10000);
    };


    // --- RENDERERS ---
    
    // 1. CREATE
    const renderCreate = () => (
        <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:0.5}} style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ display: 'flex', gap: '20px', marginBottom: '60px', opacity: 0.8, alignItems: 'center' }}>
                <div style={{ color: creationStep>=0 ? '#A855F7':'#475569', fontWeight:'bold', transition: 'color 0.3s' }}>1. Datos</div>
                <div style={{ width:'40px', height:'2px', background:'rgba(255,255,255,0.1)' }}/>
                <div style={{ color: creationStep>=1 ? '#A855F7':'#475569', fontWeight:'bold', transition: 'color 0.3s' }}>2. Guion</div>
                <div style={{ width:'40px', height:'2px', background:'rgba(255,255,255,0.1)' }}/>
                <div style={{ color: creationStep>=2 ? '#A855F7':'#475569', fontWeight:'bold', transition: 'color 0.3s' }}>3. Render</div>
            </div>

            <AnimatePresence mode='wait'>
            {creationStep === 0 && (
                <motion.div key="step0" initial={{opacity:0, x:-20}} animate={{opacity:1, x:0}} exit={{opacity:0, x:20}} transition={{duration:0.4}}>
                    <h1 style={{ marginBottom: '40px', fontSize: '36px', fontWeight: 'bold' }}>Nuevo Proyecto</h1>
                    
                    <label style={{display:'block', marginBottom:'12px', color:'#22D3EE', fontSize:'14px', fontWeight:'600', letterSpacing:'1px'}}>TEMA CENTRAL</label>
                    <input style={S.inputLarge} value={videoTopic} onChange={e => setVideoTopic(e.target.value)} placeholder="Ej. El futuro de la IA..." />
                    
                    <label style={{display:'block', marginBottom:'12px', color:'#22D3EE', fontSize:'14px', fontWeight:'600', letterSpacing:'1px'}}>CANAL</label>
                    <input style={S.inputLarge} value={channelName} onChange={e => setChannelName(e.target.value)} placeholder="Ej. TechVision" />

                    <label style={{display:'block', marginBottom:'12px', color:'#22D3EE', fontSize:'14px', fontWeight:'600', letterSpacing:'1px'}}>ESTRATEGIA</label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginBottom: '40px' }}>
                        {['Análisis (20m)', 'Documental (15m)', 'Viral (60s)', 'Historia (10m)'].map(s => (
                            <motion.button
                                whileHover={{ scale: 1.02, backgroundColor: 'rgba(168, 85, 247, 0.2)' }}
                                whileTap={{ scale: 0.98 }}
                                type="button" 
                                key={s} 
                                onClick={() => setStrategy(s)}
                                style={{
                                    padding: '24px',
                                    borderRadius: '16px',
                                    backgroundColor: strategy === s ? 'rgba(168, 85, 247, 0.15)' : 'rgba(255,255,255,0.02)',
                                    border: strategy === s ? '1px solid #A855F7' : '1px solid rgba(255,255,255,0.06)',
                                    cursor: 'pointer',
                                    transition: 'border-color 0.2s',
                                    fontWeight: strategy === s ? 'bold' : 'normal',
                                    color: strategy === s ? '#A855F7' : '#94a3b8',
                                    textAlign: 'left',
                                    fontSize: '16px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    backdropFilter: 'blur(5px)'
                                }}
                            >
                                <div style={{ width:'10px', height:'10px', borderRadius:'50%', background: strategy===s ? '#A855F7':'#334155' }}/>
                                {s}
                            </motion.button>
                        ))}
                    </div>

                    <motion.button 
                        whileHover={{ scale: 1.03, boxShadow: '0 0 40px rgba(168, 85, 247, 0.5)' }}
                        whileTap={{ scale: 0.97 }}
                        type="button" 
                        onClick={handleDraftScript} 
                        style={{...S.btnPrimary, width:'100%', justifyContent:'center', padding:'24px', fontSize:'18px'}}
                    >
                        Generar Borrador <FiZap size={20}/>
                    </motion.button>
                </motion.div>
            )}

            {creationStep === 1 && (
                <motion.div key="step1" initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} exit={{opacity:0, x:-20}} transition={{duration:0.4}}>
                    <h1 style={{ marginBottom: '20px', fontSize: '32px', fontWeight: 'bold' }}>Editor de Guion</h1>
                    <textarea style={S.textAreaScript} value={generatedScript} onChange={e => setGeneratedScript(e.target.value)} />
                    <div style={{display:'flex', gap:'20px'}}>
                        <motion.button whileHover={{scale:1.02}} type="button" onClick={() => setCreationStep(0)} style={{...S.btnSecondary, flex:1, justifyContent:'center'}}>Atrás</motion.button>
                        <motion.button whileHover={{scale:1.02}} type="button" onClick={() => handleStartRender(false)} style={{...S.btnPrimary, flex:2, justifyContent:'center'}}>Renderizar 🎬</motion.button>
                    </div>
                </motion.div>
            )}
            </AnimatePresence>
        </motion.div>
    );

    // 2. LIBRARY
    const renderLibrary = () => (
        <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '32px' }}>Mis Producciones</h1>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(320px, 1fr))', gap:'30px' }}>
                <AnimatePresence>
                {videos.map((vid) => (
                    <motion.div 
                        layout
                        initial={{opacity:0, scale:0.9}}
                        animate={{opacity:1, scale:1}}
                        exit={{opacity:0, scale:0.9, transition:{duration:0.2}}}
                        whileHover={{y:-8, scale:1.01, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'}}
                        transition={{ duration: 0.3 }}
                        key={vid.id} 
                        style={S.videoCardPro}
                        onClick={() => { setEditingVideoId(vid.id); setTab('EditVideo'); }}
                    >
                        <div style={{ height:'180px', background:'linear-gradient(135deg, #020617, #0f172a)', display:'flex', alignItems:'center', justifyContent:'center', position:'relative' }}>
                            <motion.div whileHover={{scale:1.1}} style={{width:'64px', height:'64px', borderRadius:'50%', background:'rgba(255,255,255,0.1)', display:'flex', alignItems:'center', justifyContent:'center', backdropFilter:'blur(5px)', border:'1px solid rgba(255,255,255,0.1)'}}>
                                 <FiPlay size={28} color="white" style={{marginLeft:'4px'}}/>
                            </motion.div>
                            <div style={{ position:'absolute', top:'16px', right:'16px', background:'rgba(239,68,68,0.2)', color:'#ef4444', border:'1px solid rgba(239,68,68,0.3)', fontSize:'11px', padding:'6px 12px', borderRadius:'8px', fontWeight:'bold' }}>
                                {vid.expiry || "30 días"}
                            </div>
                            <div style={{ position:'absolute', bottom:'16px', left:'16px', display:'flex', alignItems:'center', gap:'8px', fontSize:'12px', color:'#A855F7', fontWeight:'bold', background:'rgba(0,0,0,0.5)', padding:'6px 12px', borderRadius:'8px' }}>
                                <FiEdit3 /> Editar con Gemini
                            </div>
                        </div>
                        <div style={{ padding:'24px' }}>
                            <h3 style={{ fontWeight:'bold', fontSize:'18px', marginBottom:'8px', color:'#f1f5f9' }}>{vid.title}</h3>
                            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:'24px' }}>
                                <span style={{ fontSize:'13px', color:'#64748b', fontWeight:'500' }}>{vid.duration} • 4K ULTRA</span>
                                <motion.button 
                                    whileHover={{scale:1.05}}
                                    whileTap={{scale:0.95}}
                                    type="button" 
                                    onClick={(e) => { 
                                        e.stopPropagation(); 
                                        setDownloadingId(vid.id);
                                        setTimeout(()=> { setDownloadingId(null); alert("Guardado."); }, 2000);
                                    }}
                                    style={{ background: 'linear-gradient(90deg, #3B82F6, #6366f1)', border:'none', borderRadius:'10px', padding:'10px 20px', color:'white', cursor:'pointer', fontSize:'12px', fontWeight:'bold', boxShadow:'0 4px 15px rgba(59, 130, 246, 0.3)' }}
                                >
                                    {downloadingId === vid.id ? <FiLoader className="spin"/> : <FiDownload/>}
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                ))}
                </AnimatePresence>
            </div>
            {videos.length === 0 && (
                <div style={{textAlign:'center', padding:'80px', opacity:0.4, border:'2px dashed rgba(255,255,255,0.05)', borderRadius:'32px'}}>
                    <FiVideo size={48} style={{marginBottom:'24px', color:'#475569'}}/>
                    <p>Tu biblioteca está vacía.</p>
                </div>
            )}
        </div>
    );

    // 3. SETTINGS
    const renderSettings = () => (
        <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '60px', fontSize: '48px', fontWeight: 'bold', background: 'linear-gradient(to right, #fff, #94a3b8)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>Planes</h1>
            <div style={{ display: 'flex', gap: '30px', alignItems: 'stretch' }}>
                {['free', 'pro', 'ultra'].map((plan) => (
                    <motion.div 
                        key={plan}
                        whileHover={{y:-10}} 
                        style={plan==='pro' ? {...S.priceCard, ...S.priceCardFeatured} : S.priceCard}
                    >
                        {plan==='pro' && <div style={{position:'absolute', top:'-15px', left:'50%', transform:'translateX(-50%)', background:'#A855F7', padding:'6px 16px', borderRadius:'99px', fontSize:'12px', fontWeight:'bold', boxShadow:'0 0 20px rgba(168, 85, 247, 0.4)'}}>RECOMENDADO</div>}
                        <h3 style={{ fontSize:'24px', fontWeight:'bold', textTransform:'uppercase', color: plan==='ultra'?'#FFD700':plan==='pro'?'#A855F7':'#94a3b8' }}>{plan}</h3>
                        <div style={S.priceAmount}>{plan==='free'?'$0':plan==='pro'?'$20':'$40'}</div>
                        <motion.button 
                            whileHover={{scale:1.05}} whileTap={{scale:0.95}}
                            type="button"
                            onClick={() => { if(plan!=='free') { setUserPlan(plan as any); alert(`Bienvenido a ${plan.toUpperCase()}`); } }}
                            disabled={userPlan===plan}
                            style={{...S.btnPlan, background: userPlan===plan ? 'rgba(255,255,255,0.05)' : plan==='ultra'?'rgba(255,215,0,0.1)':'#A855F7'}}
                        >
                            {userPlan===plan ? 'ACTUAL' : 'MEJORAR'}
                        </motion.button>
                    </motion.div>
                ))}
            </div>
        </div>
    );

    // 4. ADMIN
    const renderAdmin = () => (
        <div style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto' }}>
            <h1 style={{ color: '#FFD700', marginBottom: '40px', fontSize: '36px', fontWeight: 'bold' }}>Panel Administrativo 2.5</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '30px', marginBottom: '40px' }}>
                <div style={{ ...S.card, padding: '30px', border: '1px solid rgba(255, 215, 0, 0.3)' }}>
                    <h3 style={{fontSize:'20px', fontWeight:'bold', marginBottom:'20px', color:'#FFD700'}}>Cupones Flexibles</h3>
                    <input style={{...S.inputLarge, padding:'14px', fontSize:'16px', marginBottom:'20px'}} value={couponPrefix} onChange={e => setCouponPrefix(e.target.value)} placeholder="Ej. NAVIDAD2026"/>
                    <button onClick={generateDiscount} type="button" style={{...S.btnSecondary, background:'#FFD700', color:'black', width:'100%', justifyContent:'center', marginBottom:'20px', borderRadius:'12px'}}>Generar Código</button>
                    {discountCode && <code style={{fontSize:'18px', color:'#22D3EE'}}>{discountCode}</code>}
                </div>
                <div style={{ ...S.card, padding: '30px', border: '1px solid rgba(255, 215, 0, 0.3)' }}>
                    <h3 style={{fontSize:'20px', fontWeight:'bold', marginBottom:'20px', color:'#FFD700'}}>Links de Regalo</h3>
                    <button onClick={generateGiftLink} type="button" style={{...S.btnSecondary, background:'#FFD700', color:'black', width:'100%', justifyContent:'center', marginBottom:'20px', borderRadius:'12px'}}>Generar Link</button>
                    {giftLink && <code style={{fontSize:'12px', color:'#22D3EE'}}>{giftLink}</code>}
                </div>
            </div>
        </div>
    );

    // 5. EDIT VIDEO
    const renderEditVideo = () => (
        <div style={{ padding: '40px', maxWidth: '1100px', margin: '0 auto', height:'100%', display:'flex', flexDirection:'column' }}>
            <motion.button onClick={() => { setTab('Mis Videos'); setEditingVideoId(null); }} style={{ background:'transparent', border:'none', color:'#94a3b8', cursor:'pointer', display:'flex', alignItems:'center', gap:'8px', marginBottom:'20px' }}><FiCornerUpLeft/> Volver</motion.button>
            <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '10px' }}>Editor Post-Render</h1>
            <div style={{ flex: 1, display: 'flex', gap: '40px' }}>
                <div style={{ flex: 2, background: 'black', borderRadius: '24px', display:'flex', alignItems:'center', justifyContent:'center', border:'1px solid #1e293b', boxShadow:'0 20px 50px rgba(0,0,0,0.5)' }}>
                    <FiPlay size={80} color="#333"/>
                </div>
                <div style={{ flex: 1, display:'flex', flexDirection:'column', gap:'20px' }}>
                    <div style={{ flex:1, background: 'rgba(255,255,255,0.02)', borderRadius: '20px', padding: '24px' }}><p><strong>Gemini AI:</strong> "Listo para editar."</p></div>
                    <input style={{ flex:1, background:'rgba(0,0,0,0.4)', border:'1px solid #334155', padding:'18px', borderRadius:'14px', color:'white', outline:'none' }} placeholder="Ej. Haz las luces más brillantes..." value={editPrompt} onChange={(e) => setEditPrompt(e.target.value)} />
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="button" onClick={() => handleStartRender(true)} disabled={!editPrompt} style={{ ...S.btnPrimary, justifyContent:'center', opacity: !editPrompt ? 0.5 : 1 }}>Generar Nueva Versión (v2)</motion.button>
                </div>
            </div>
        </div>
    );

    // 6. DASHBOARD
    const renderDashboard = () => (
        <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
            <h1 style={{ marginBottom: '24px', fontWeight: 'bold', fontSize: '36px' }}>Panel de Control</h1>
            <p style={{ color: '#94a3b8', marginBottom: '40px', fontSize:'18px' }}>Bienvenido. Plan actual: <strong style={{color:'#A855F7', textTransform:'uppercase'}}>{userPlan}</strong></p>
            <div style={{ display: 'flex', gap: '30px' }}>
                <motion.div whileHover={{y:-5}} style={S.card}>
                    <div style={{color:'#94a3b8', marginBottom:'8px', fontWeight:'500'}}>Videos Generados</div>
                    <div style={{fontSize:'42px', fontWeight:'bold'}}>{videos.length} <span style={{fontSize:'20px', color:'#666'}}>/ {userPlan==='free'?'2':userPlan==='pro'?'18':'∞'}</span></div>
                </motion.div>
                <motion.div whileHover={{y:-5}} style={S.card}>
                    <div style={{color:'#94a3b8', marginBottom:'8px', fontWeight:'500'}}>Horas de Render</div>
                    <div style={{fontSize:'42px', fontWeight:'bold', color:'#22D3EE'}}>12.5h</div>
                </motion.div>
                <motion.div whileHover={{y:-5}} style={S.card}>
                    <div style={{color:'#94a3b8', marginBottom:'8px', fontWeight:'500'}}>Estado</div>
                    <div style={{fontSize:'42px', fontWeight:'bold', color:'#10B981'}}>Online</div>
                </motion.div>
            </div>
        </div>
    );

    return (
        <div style={S.container}>
            {/* OVERLAY RENDER */}
            <AnimatePresence>
                {generating && (
                    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} style={S.overlay}>
                        <motion.div 
                            style={S.core} 
                            animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7], rotate: [0, 180, 360] }}
                            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                        />
                        <div style={S.consoleBox}>&gt; {genLog}<span className="blink">_</span></div>
                        <div style={S.timelineContainer}>
                            {scenes.map(s => (
                                <motion.div key={s} layoutId={`scene-${s}`} style={{...S.sceneBlock, left: `${s*10}%`}} />
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* SIDEBAR */}
            <aside style={S.sidebar}>
                <div style={S.logo}><div style={S.logoIcon}/> KromaFlow</div>
                <nav style={{ flex: 1 }}>
                    {['Dashboard', 'Mis Videos', 'Ajustes'].map(item => (
                        <div 
                            key={item}
                            onClick={() => { setTab(item); if(item!=='Mis Videos') setEditingVideoId(null); }} 
                            style={tab===item || (item==='Mis Videos' && tab==='EditVideo') ? {...S.navItem, ...S.navItemActive} : S.navItem}
                        >
                            {item==='Dashboard' && <FiHome/>}
                            {item==='Mis Videos' && <FiFolder/>}
                            {item==='Ajustes' && <FiSettings/>}
                            {item}
                        </div>
                    ))}
                    {isAdmin && (
                        <div 
                            onClick={() => setTab('Admin')}
                            style={tab==='Admin' ? {...S.navItem, ...S.navItemActive, color: '#white', borderColor: '#FFD700', borderRadius:'14px', background:'rgba(255, 215, 0, 0.1)'} : {...S.navItem, color:'#FFD700'}}
                        >
                            <FiShield/> Admin
                        </div>
                    )}
                </nav>
                <div style={{ background:'rgba(255,255,255,0.03)', padding:'16px', borderRadius:'16px', display:'flex', alignItems:'center', gap:'12px', marginTop:'auto', border:'1px solid rgba(255,255,255,0.05)' }}>
                    <UserButton />
                    <div style={{fontSize:'12px', opacity:0.7}}>Sesión Activa</div>
                </div>
            </aside>

            {/* MAIN */}
            <main style={S.main}>
                <header style={S.header}>
                    <h2 style={{fontWeight:'bold', fontSize:'22px', letterSpacing:'0.5px'}}>{tab === 'EditVideo' ? 'Editor Post-Render' : tab}</h2>
                    {tab==='Dashboard' && (
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="button" 
                            onClick={() => setTab('Create')} 
                            style={S.btnPrimary}
                        >
                            + Crear Video
                        </motion.button>
                    )}
                </header>
                
                {tab === 'Dashboard' && renderDashboard()}
                {tab === 'Create' && renderCreate()}
                {tab === 'Mis Videos' && renderLibrary()}
                {tab === 'Ajustes' && renderSettings()}
                {tab === 'Admin' && isAdmin && renderAdmin()}
                {tab === 'EditVideo' && renderEditVideo()}
            </main>
        </div>
    );
};

// --- LANDING PAGE ---
const LandingPage = () => (
    <div style={S.landing}>
        <div style={{ position:'absolute', width:'100%', height:'100%', background:'radial-gradient(circle at 50% 100%, #1e293b 0%, #020617 50%)' }} />
        <div style={{ zIndex: 10, textAlign: 'center' }}>
            <motion.h1 initial={{opacity:0, y:-30}} animate={{opacity:1, y:0}} transition={{duration:0.8, ease:'easeOut'}} style={S.titleSimple}>KromaFlow Studio</motion.h1>
            <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.3, duration:0.8}} style={S.subtitleSimple}>Producción de Video Documental con IA</motion.p>
            <SignInButton mode="modal">
                <motion.button whileHover={{scale:1.05, boxShadow:'0 0 60px rgba(255,255,255,0.4)'}} whileTap={{scale:0.95}} style={S.btnSimple}>Entrar al Estudio <FiArrowRight style={{marginLeft:'8px'}}/></motion.button>
            </SignInButton>
        </div>
    </div>
);

const KromaFlowPage = () => (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <SignedIn><KromaApp /></SignedIn>
        <SignedOut><LandingPage /></SignedOut>
    </ClerkProvider>
);

export default KromaFlowPage;

// --- INSTRUCCIONES DE EMERGENCIA PARA PUBLICACIÓN (NO ES CÓDIGO DE REACT) ---
/*
// Si el usuario tiene problemas para subir a GitHub, debe ejecutar estos comandos:
// 1. Añadir y Guardar cambios localmente:
// git add .
// git commit -m "KromaFlow FINAL (v5.0) - Ready for Deploy"

// 2. FORZAR CONEXIÓN Y SUBIDA (SOLUCIÓN DE FALLOS CON TU URL):
// git remote set-url origin https://github.com/eduardodavidregules-ship-it/KromaFlow-Studio.git
// git push -u origin main --force

// 3. VARIABLES DE ENTORNO SUGERIDAS (Para Vercel/Netlify):
// NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_ZmFpci1nb29zZS02Mi5jbGVyay5hY2NvdW50cy5kZXYk
// CLERK_SECRET_KEY=sk_test_GhbweBOofz63cLb6KS0rTjTNQhjObdwxuFDoo8fb0A
*/
