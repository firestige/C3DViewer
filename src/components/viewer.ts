import * as THREE from 'three';
import { parseCIF, parseMOL, parsePDB } from '../utils/parsers';

export interface MolecularViewerOptions {
  container: HTMLElement;
  fileContent: string;
  fileType: 'cif' | 'mol' | 'pdb';
}

export class MolecularViewer {
  private scene: THREE.Scene | undefined;
  private camera: THREE.PerspectiveCamera | undefined;
  private renderer: THREE.WebGLRenderer | undefined;
  private model: THREE.Object3D | undefined;
  private container: HTMLElement;
  private fileContent: string;
  private fileType: 'cif' | 'mol' | 'pdb';
  private animationId: number | null = null;

  constructor(options: MolecularViewerOptions) {
    this.container = options.container;
    this.fileContent = options.fileContent;
    this.fileType = options.fileType;

    this.init();
  }

  private init() {
    // 设置场景
    this.scene = new THREE.Scene();

    // 设置渲染器
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(
      this.container.clientWidth,
      this.container.clientHeight
    );
    this.container.appendChild(this.renderer.domElement);

    // 设置相机
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.container.clientWidth / this.container.clientHeight,
      0.1,
      1000
    );
    this.camera.position.z = 5;

    // 添加环境光
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    this.scene.add(ambientLight);

    // 解析文件内容并创建模型
    switch (this.fileType) {
      case 'cif':
        this.model = parseCIF(this.fileContent);
        break;
      case 'mol':
        this.model = parseMOL(this.fileContent);
        break;
      case 'pdb':
        this.model = parsePDB(this.fileContent);
        break;
      default:
        throw new Error('Unsupported file type');
    }
    this.scene.add(this.model);

    // 开始渲染
    this.animate();
  }

  private animate = () => {
    this.animationId = requestAnimationFrame(this.animate);
    this.model!.rotation.y += 0.01;
    // @ts-ignore
    this.renderer!.render(this.scene, this.camera);
  };

  public dispose() {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
    }
    this.renderer!.dispose();
    // @ts-ignore
    this.container.removeChild(this.renderer.domElement);
  }
}