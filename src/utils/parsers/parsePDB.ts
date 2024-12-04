import * as THREE from 'three'

export const parsePDB = (fileContent: string): THREE.Object3D => {
  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshBasicMaterial({color: 0xff0000})
  const cube = new THREE.Mesh(geometry, material)
  fileContent.split('\n').forEach((line) => {line})
  return cube;
}