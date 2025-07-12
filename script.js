// 音乐播放器功能
class MusicPlayer {
    constructor() {
        this.audio = document.getElementById('audio-player');
        this.playBtn = document.getElementById('play-btn');
        this.pauseBtn = document.getElementById('pause-btn');
        this.stopBtn = document.getElementById('stop-btn');
        this.volumeSlider = document.getElementById('volume-slider');
        this.playlistItems = document.querySelectorAll('.playlist-item');
        this.trackTitle = document.getElementById('track-title');
        this.trackArtist = document.getElementById('track-artist');
        
        this.currentTrackIndex = 0;
        this.isPlaying = false;
        
        this.initializePlayer();
        this.bindEvents();
    }
    
    initializePlayer() {
        // 设置初始音量
        this.audio.volume = this.volumeSlider.value / 100;
        
        // 隐藏默认的音频控件
        this.audio.style.display = 'none';
        
        // 设置播放列表数据
        this.playlist = [
            {
                title: '刘欣瑶mvp结算曲',
                artist: '刘欣瑶精选',
                src: 'http://music.163.com/song/media/outer/url?id=1821539057.mp3'
            },
            {
                title: '刘欣瑶进行曲',
                artist: '刘欣瑶精选',
                src: 'http://music.163.com/song/media/outer/url?id=2712646077.mp3'
            },
            {
                title: '刘欣瑶挑战音乐',
                artist: '刘欣瑶精选',
                src: 'http://music.163.com/song/media/outer/url?id=2714526823.mp3'
            }
        ];
        
        this.loadTrack(0);
    }
    
    bindEvents() {
        // 播放按钮事件
        this.playBtn.addEventListener('click', () => {
            this.play();
        });
        
        // 暂停按钮事件
        this.pauseBtn.addEventListener('click', () => {
            this.pause();
        });
        
        // 停止按钮事件
        this.stopBtn.addEventListener('click', () => {
            this.stop();
        });
        
        // 音量控制事件
        this.volumeSlider.addEventListener('input', (e) => {
            this.setVolume(e.target.value / 100);
        });
        
        // 播放列表点击事件
        this.playlistItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                this.loadTrack(index);
                this.play();
            });
        });
        
        // 音频事件
        this.audio.addEventListener('ended', () => {
            this.nextTrack();
        });
        
        this.audio.addEventListener('timeupdate', () => {
            this.updateProgress();
        });
    }
    
    loadTrack(index) {
        if (index >= 0 && index < this.playlist.length) {
            this.currentTrackIndex = index;
            const track = this.playlist[index];
            
            this.audio.src = track.src;
            this.trackTitle.textContent = track.title;
            this.trackArtist.textContent = track.artist;
            
            // 更新播放列表高亮
            this.updatePlaylistHighlight();
        }
    }
    
    play() {
        this.audio.play().then(() => {
            this.isPlaying = true;
            this.updatePlayButton();
        }).catch(error => {
            console.error('播放失败:', error);
            this.showMessage('播放失败，请检查音频文件');
        });
    }
    
    pause() {
        this.audio.pause();
        this.isPlaying = false;
        this.updatePlayButton();
    }
    
    stop() {
        this.audio.pause();
        this.audio.currentTime = 0;
        this.isPlaying = false;
        this.updatePlayButton();
    }
    
    nextTrack() {
        const nextIndex = (this.currentTrackIndex + 1) % this.playlist.length;
        this.loadTrack(nextIndex);
        this.play();
    }
    
    previousTrack() {
        const prevIndex = this.currentTrackIndex === 0 ? 
            this.playlist.length - 1 : this.currentTrackIndex - 1;
        this.loadTrack(prevIndex);
        this.play();
    }
    
    setVolume(volume) {
        this.audio.volume = volume;
    }
    
    updatePlayButton() {
        if (this.isPlaying) {
            this.playBtn.style.opacity = '0.5';
            this.pauseBtn.style.opacity = '1';
        } else {
            this.playBtn.style.opacity = '1';
            this.pauseBtn.style.opacity = '0.5';
        }
    }
    
    updatePlaylistHighlight() {
        this.playlistItems.forEach((item, index) => {
            item.classList.toggle('active', index === this.currentTrackIndex);
        });
    }
    
    updateProgress() {
        // 这里可以添加进度条更新逻辑
        // 由于我们隐藏了默认控件，这里只是示例
    }
    
    showMessage(message) {
        // 创建消息提示
        const messageDiv = document.createElement('div');
        messageDiv.textContent = message;
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(102, 126, 234, 0.9);
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(messageDiv);
        
        setTimeout(() => {
            messageDiv.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(messageDiv);
            }, 300);
        }, 3000);
    }
}

// 图片画廊功能
class ImageGallery {
    constructor() {
        this.images = document.querySelectorAll('.image-item img');
        this.initializeGallery();
    }
    
    initializeGallery() {
        this.images.forEach(img => {
            img.addEventListener('click', () => {
                this.openLightbox(img);
            });
            
            // 确保图片正常显示
            img.style.opacity = '1';
            img.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        });
    }
    
    openLightbox(img) {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <img src="${img.src}" alt="${img.alt}">
                <button class="lightbox-close">&times;</button>
            </div>
        `;
        
        lightbox.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            animation: fadeIn 0.3s ease;
        `;
        
        const lightboxContent = lightbox.querySelector('.lightbox-content');
        lightboxContent.style.cssText = `
            position: relative;
            max-width: 90%;
            max-height: 90%;
        `;
        
        const lightboxImg = lightbox.querySelector('img');
        lightboxImg.style.cssText = `
            width: 100%;
            height: auto;
            border-radius: 10px;
        `;
        
        const closeBtn = lightbox.querySelector('.lightbox-close');
        closeBtn.style.cssText = `
            position: absolute;
            top: -40px;
            right: 0;
            background: none;
            border: none;
            color: white;
            font-size: 2rem;
            cursor: pointer;
            padding: 10px;
        `;
        
        document.body.appendChild(lightbox);
        
        // 关闭事件
        closeBtn.addEventListener('click', () => {
            lightbox.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(lightbox);
            }, 300);
        });
        
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeBtn.click();
            }
        });
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    // 立即开始文字动画
    const startTextAnimation = () => {
        const blockquote = document.querySelector('blockquote');
        if (blockquote) {
            const text = blockquote.textContent;
            blockquote.textContent = '';
            blockquote.style.border = 'none';
            
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    blockquote.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 100);
                } else {
                    blockquote.style.borderLeft = '4px solid #667eea';
                }
            };
            
            // 立即开始打字机效果
            typeWriter();
        }
    };
    
    // 立即执行文字动画
    startTextAnimation();
    
    // 初始化音乐播放器
    const musicPlayer = new MusicPlayer();
    
    // 初始化图片画廊
    const imageGallery = new ImageGallery();
    
    // 检查是否来自欢迎页面
    const urlParams = new URLSearchParams(window.location.search);
    const isFromWelcome = urlParams.get('autoplay') === 'true';
    
    // 自动尝试播放音乐 - 更激进的策略
    const autoPlayMusic = () => {
        const audio = document.getElementById('audio-player');
        if (audio) {
            // 设置音频属性
            audio.volume = 0.3; // 降低音量
            audio.muted = false;
            
            // 方法1: 立即尝试播放
            const tryPlay = () => {
                audio.play().then(() => {
                    console.log('✅ 音乐自动播放成功！');
                }).catch((error) => {
                    console.log('❌ 自动播放失败:', error.message);
                });
            };
            
            // 方法2: 静音播放后取消静音
            const tryMutedPlay = () => {
                audio.muted = true;
                audio.play().then(() => {
                    console.log('✅ 静音播放成功，准备取消静音');
                    setTimeout(() => {
                        audio.muted = false;
                        console.log('✅ 取消静音成功');
                    }, 200);
                }).catch((error) => {
                    console.log('❌ 静音播放也失败:', error.message);
                });
            };
            
            // 方法3: 用户交互后播放
            const playOnUserInteraction = () => {
                audio.muted = false;
                audio.play().then(() => {
                    console.log('✅ 用户交互后播放成功！');
                }).catch((error) => {
                    console.log('❌ 用户交互后播放失败:', error.message);
                });
            };
            
            // 监听所有可能的用户交互
            const userInteractionEvents = [
                'click', 'touchstart', 'touchend', 'mousedown', 'mouseup',
                'keydown', 'keyup', 'scroll', 'wheel', 'focus', 'blur'
            ];
            
            userInteractionEvents.forEach(eventType => {
                window.addEventListener(eventType, playOnUserInteraction, { once: true });
            });
            
            // 如果来自欢迎页面，立即播放
            if (isFromWelcome) {
                console.log('🎵 来自欢迎页面，立即播放音乐');
                tryPlay();
                setTimeout(tryMutedPlay, 100);
                setTimeout(tryPlay, 500);
            } else {
                // 立即尝试所有方法
                tryPlay();
                setTimeout(tryMutedPlay, 100);
                setTimeout(tryPlay, 500);
                setTimeout(tryMutedPlay, 1000);
                setTimeout(tryPlay, 2000);
            }
            
            // 每5秒尝试一次，直到成功
            const interval = setInterval(() => {
                if (!audio.paused) {
                    console.log('✅ 音乐已在播放，停止重试');
                    clearInterval(interval);
                    return;
                }
                console.log('🔄 重试播放音乐...');
                tryPlay();
            }, 5000);
            
            // 10秒后停止重试
            setTimeout(() => {
                clearInterval(interval);
                console.log('⏰ 停止自动播放重试');
            }, 10000);
        }
    };
    
    // 页面加载后立即尝试播放
    autoPlayMusic();
    
    // 确保DOM完全加载后再次尝试
    setTimeout(autoPlayMusic, 100);
    setTimeout(autoPlayMusic, 500);
    setTimeout(autoPlayMusic, 1000);
    
    // 添加页面滚动动画
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // 观察所有section元素
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});

// 添加CSS动画
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style); 