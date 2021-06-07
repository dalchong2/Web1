const {mat2, mat3, mat4, vec2, vec3, vec4} = glMatrix;

function main(){
    ma = mat4.create();
    va = vec3.create();

    mb = mat4.fromRotation(ma, 1.5,[1,1,1])

    console.log('ma= ',ma);
    console.log('mb= ',mb);

}