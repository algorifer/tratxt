export const userMetaTemplate = (name: string) => `# tratxt system 0.1
# You can learn more about this format on https://tratxt.vercel.com/docs
#
# Profile:
# name        = ${name ?? ''}
# url         = ${name ? `https://tratxt.vercel.com/users/${name}/tratxt.txt` : ''}
# description =
# site        =
#`