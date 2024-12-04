// import './style.css'
// import typescriptLogo from './typescript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.ts'
//
// document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
//   <div>
//     <a href="https://vite.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://www.typescriptlang.org/" target="_blank">
//       <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
//     </a>
//     <h1>Vite + TypeScript</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite and TypeScript logos to learn more
//     </p>
//   </div>
// `
//
// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)

import './style.css';
import { MolecularViewer } from './components/viewer';

const app = document.getElementById('app') as HTMLDivElement;

// 创建文件输入元素
const fileInput = document.createElement('input');
fileInput.type = 'file';
fileInput.accept = '.cif,.mol,.pdb';
fileInput.className = 'mb-4';

app.appendChild(fileInput);

// 创建查看器容器
const viewerContainer = document.createElement('div');
viewerContainer.className = 'w-full h-full';
viewerContainer.style.width = '100%';
viewerContainer.style.height = '600px'; // 固定高度
app.appendChild(viewerContainer);

let viewer: MolecularViewer | null = null;

fileInput.addEventListener('change', (event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    const extension = file.name.split('.').pop()?.toLowerCase();
    if (extension === 'cif' || extension === 'mol' || extension === 'pdb') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;

        // 如果已有查看器实例，先销毁
        if (viewer) {
          viewer.dispose();
        }

        // 创建新的查看器实例
        viewer = new MolecularViewer({
          container: viewerContainer,
          fileContent: content,
          fileType: extension as 'cif' | 'mol' | 'pdb',
        });
      };
      reader.readAsText(file);
    } else {
      alert('不支持的文件类型！');
    }
  }
});
